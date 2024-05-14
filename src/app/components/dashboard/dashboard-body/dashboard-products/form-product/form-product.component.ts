import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { getDownloadURL, getStorage } from '@firebase/storage';
import { CrudForm } from 'src/app/interfaces/crudForm';
import { ProductRequest } from 'src/app/interfaces/productRequest';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {

  // * ATRIBUTOS
  //#region 
  @Output() refreshListProducts: EventEmitter<ProductRequest> = new EventEmitter();
  @Output() idProductDelete: EventEmitter<number> = new EventEmitter();
  @Output() refreshProductUpdate: EventEmitter<ProductRequest> = new EventEmitter();

  dataForm?: CrudForm;
  formReadonly: boolean = false;
  disableBtnAction: boolean = false;

  imgDefault: string = 'https://via.placeholder.com/150'; //Si la lista de imagenes esta vacia muestro esto
  imgsList: File[] = []; //Lista de Images []
  imgsListURLs: string[] = [];

  formProduct: FormGroup = this.FormBuilder.group({
    'name': ['', Validators.required],
    'category': ['', Validators.required],
    'state': ['', Validators.required],
    'price': ['', Validators.required],
    'discount': ['', Validators.required],
    'stock': ['', Validators.required],
    'discharge_date': ['', Validators.required],
    'img': [[], []],
    'description': ['', Validators.required]
  });
  //#endregion

  // * GETTERs and SETTERs
  //#region 
  get name() {
    return this.formProduct.controls['name'];
  }

  get category() {
    return this.formProduct.controls['category'];
  }

  get state() {
    return this.formProduct.controls['state'];
  }

  get price() {
    return this.formProduct.controls['price'];
  }

  get discount() {
    return this.formProduct.controls['discount'];
  }

  get stock() {
    return this.formProduct.controls['stock'];
  }

  get discharge_date() {
    return this.formProduct.controls['discharge_date'];
  }

  get img() {
    return this.formProduct.controls['img'];
  }

  get description() {
    return this.formProduct.controls['description'];
  }
  //#endregion

  // * CONSTRUCTOR
  constructor(
    private FormBuilder: FormBuilder,
    private ProductService: ProductService,
    private storage: Storage,
    private ToastService: ToastService
  ) { }

  ngOnInit(): void {
    // this.ToastService.showOverlay = true;
  }

  // * METHODs
  //#region 

  /**
     * Metodo de componente hijo que es llamado desde el padre (dashboard-product.component.ts)
     * 
     * 0 - ADD: form clean
     * 1- PUT: load product data Form
     * 2- DEL: load product data form readonly -> view new modal confirm product delete
    **/
  loadFormProduct(data: any) {
    // this, this.formProduct.reset();
    this.dataForm = data;
    this.loadDataFormProduct();

    if (this.dataForm) {
      switch (this.dataForm.action) {
        case 0:
          //ADD :                     
          this.formProduct.enable();
          this.disableBtnAction = false;
          break;
        case 1:
          //UPDATE:    
          this.formProduct.enable();
          this.disableBtnAction = false;
          break;
        case 2:
          //DELETE: 
          //View Modal Delete product          
          const modal_delete_product = document.getElementById('delete-modal-product');
          this.disableBtnAction = true;
          modal_delete_product?.classList.remove('hidden');
          break;
        case 3:
          //View ReadONly: Solo Lectura
          this.formProduct.disable();
          this.disableBtnAction = true;
          break;
      }
    }
  }


  /**
   * Guarda las imagenes subidas en un array global 
   * @param event 
   */
  onSaveFileLocal(event: any): void {
    this.imgsList = [];//Lista para service db
    this.imgsListURLs = [];//Lista para ver en formulario

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    for (const f of event.target.files) {
      const modifiedFileName = `img_${year}${month}${day}_${hours}${minutes}${seconds}_${f.name}`;

      this.imgsList.push(new File([f], modifiedFileName, { type: f.type }));
    }

    for (const img of this.imgsList) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (data: any) => {
        this.imgsListURLs.push(data.target.result);
      }
    }
  }

  /**
   * Agrega un nuevo producto
   */
  addProduct() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      this.ToastService.showOverlay = true;


      let productRequest: ProductRequest = {
        name: this.formProduct.controls['name'].value,
        category: this.formProduct.controls['category'].value,
        description: this.formProduct.controls['description'].value,
        price: this.formProduct.controls['price'].value,
        discount: this.formProduct.controls['discount'].value,
        stock: this.formProduct.controls['stock'].value,
        state: this.formProduct.controls['state'].value,
        discharge_date: this.formProduct.controls['discharge_date'].value,
        img: []
      } as ProductRequest;
      // discharge_date: this.datePipe.transform(this.formProduct.controls['discharge_date'].value, 'dd/MM/yyyy'),
      
      const uploadImgToFireStore = this.imgsList.map(file => {
        const imgRef = ref(this.storage, `images/${file.name}`);
        return uploadBytes(imgRef, file).then(async () => {
          let imgURL = await getDownloadURL(imgRef);
          productRequest.img.push(imgURL);
        });
      });


      // ? Description de proceso
      /**
       * 1- Subo las Imagenes a FirebaseStorage
       * 2- Genero un array con los links de las img
       * 3- Adjunto el array de imgs al producto de la request
       * 4- Doy de alta el Producto
       */
      //Espero a la promesa uploadImgFireStorage para despues crear el producto
      Promise.all(uploadImgToFireStore).then(
        () => {
          this.ProductService.svAddProduct(productRequest).subscribe({
            next: (response) => {
              setTimeout(() => {
                this.refreshList(response);
                this.ToastService.showOverlay = false;
                this.closeModal();
              }, 1000);
            }, error: (error) => {
              console.error(error);
            }
          });
        }
      ).catch(error => {
        console.log(error);
        this.ToastService.showOverlay = false;
      });
    }
  }


  /**
   * Modifica un producto
   */
  updateProduct() {
    if (this.formProduct.invalid) {
      this.formProduct.markAllAsTouched();
    } else {
      this.ToastService.showOverlay = true;
      let productRequest: ProductRequest = {
        id: this.dataForm?.item?.id,
        name: this.formProduct.controls['name'].value,
        category: this.formProduct.controls['category'].value,
        description: this.formProduct.controls['description'].value,
        price: this.formProduct.controls['price'].value,
        discount: this.formProduct.controls['discount'].value,
        stock: this.formProduct.controls['stock'].value,
        state: this.formProduct.controls['state'].value,
        discharge_date: this.formProduct.controls['discharge_date'].value,
        img: this.dataForm?.item.img
      } as ProductRequest;
    // discharge_date: this.datePipe.transform(this.formProduct.controls['discharge_date'].value, 'dd/MM/yyyy'),

      this.ProductService.svUpdateProduct(productRequest).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.refreshProduct(response);
            this.ToastService.showOverlay = false;
            this.closeModal();
          }, 1000);
        }, error: (error) => {
          console.error(error);
        }
      });
    }
  }


  /**
 * Button Submit de Acciones
 * 0: Alta de Producto
 * 1: Modificacion de Producto
 * 2: Baja de Producto
 */
  formAction() {
    if (this.dataForm) {
      switch (this.dataForm.action) {
        case 0:
          this.addProduct();
          break;
        case 1:
          this.updateProduct();
          break;
        case 2:
          //DELETE: elimino logicamente un producto
          //Esto deberia ser un update modificando un valor de publicado: [true/false]
          // ?  DeleteProductComponent.ts -> lugar de eliminacion de productos
          break;
      }
    }
  }


  /**
  * Cargo el formulario con los datos del producto
  */
  loadDataFormProduct() {
    this.formProduct.patchValue({
      name: this.dataForm?.item?.name,
      category: this.dataForm?.item?.category,
      description: this.dataForm?.item?.description,
      price: this.dataForm?.item?.price,
      discount: this.dataForm?.item?.discount,
      stock: this.dataForm?.item?.stock,
      state: this.dataForm?.item?.state,
      discharge_date:  this.dataForm?.item?.discharge_date
    });

    this.imgsListURLs = this.dataForm?.item?.img;
  }


  /**
   * Cierra el Formulario de Producto (form Crud)
   */
  closeModal() {
    const modal = document.getElementById('crud-modal-product');
    this.formProduct.reset();
    modal?.classList.add('hidden');
  }


  /**
   * Envio por el nuevo Producto por Output para agregar a la lista de Productos que se encuentra 
   * en el dashboard-products.ts
   * 
   * @param productRequest 
   */
  refreshList(product: ProductRequest) {
    this.refreshListProducts.emit(product);
  }

  /**
   * Envio por el nuevo Producto por Output para modificar a la lista de Productos que se encuentra 
   * en el dashboard-products.ts
   * @param product 
   */
  refreshProduct(product: ProductRequest) {
    this.refreshProductUpdate.emit(product);
  }

  /**
  * Envio por el nuevo Producto por Output para eliminar de la lista de Productos que se encuentra 
  * en el dashboard-products.ts
  * @param product 
  */
  eliminarProductList(idProduct: number) {
    this.idProductDelete.emit(idProduct);
  }


  //#endregion
}
