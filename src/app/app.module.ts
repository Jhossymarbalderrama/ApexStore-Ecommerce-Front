import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { ExploreComponent } from './components/home/explore/explore.component';
import { StoreComponent } from './components/store/store.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ItemComponent } from './components/store/item/item.component';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { FormPerfilComponent } from './components/form-perfil/form-perfil.component';
import { DashboardMenuComponent } from './components/dashboard/dashboard-menu/dashboard-menu.component';
import { DashboardBodyComponent } from './components/dashboard/dashboard-body/dashboard-body.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-body/dashboard-home/dashboard-home.component';
import { DashboardProfileComponent } from './components/dashboard/dashboard-body/dashboard-profile/dashboard-profile.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-body/dashboard-products/dashboard-products.component';
import { DashboardArticlesComponent } from './components/dashboard/dashboard-body/dashboard-articles/dashboard-articles.component';
import { CopyrightComponent } from './components/footer/copyright/copyright.component';
import { DashboardStoreComponent } from './components/dashboard/dashboard-body/dashboard-store/dashboard-store.component';
import { DashboardShoppingCartComponent } from './components/dashboard/dashboard-body/dashboard-shopping-cart/dashboard-shopping-cart.component';
import { DashboardShoppingHistoryComponent } from './components/dashboard/dashboard-body/dashboard-shopping-history/dashboard-shopping-history.component';
import { DashboardOrdersComponent } from './components/dashboard/dashboard-body/dashboard-orders/dashboard-orders.component';
import { DashboardListUsersComponent } from './components/dashboard/dashboard-body/dashboard-list-users/dashboard-list-users.component';
import { DashboardContactComponent } from './components/dashboard/dashboard-body/dashboard-contact/dashboard-contact.component';
import { DashboardAnalyticsComponent } from './components/dashboard/dashboard-body/dashboard-analytics/dashboard-analytics.component';
import { FormProductComponent } from './components/dashboard/dashboard-body/dashboard-products/form-product/form-product.component';
import { DeleteProductComponent } from './components/dashboard/dashboard-body/dashboard-products/delete-product/delete-product.component';
import { FilterNameProductPipe } from './pipes/filter-name-product.pipe';
import { FilterCategoryProductPipe } from './pipes/filter-category-product.pipe';
import { FormUserComponent } from './components/dashboard/dashboard-body/dashboard-list-users/form-user/form-user.component';
import { DeleteUserComponent } from './components/dashboard/dashboard-body/dashboard-list-users/delete-user/delete-user.component';
import { BannerAboutComponent } from './components/about/banner-about/banner-about.component';
import { BannerContactComponent } from './components/contact/banner-contact/banner-contact.component';
import { BannerStoreComponent } from './components/store/banner-store/banner-store.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { TokenExpirationInterceptor } from './services/token-expiration.interceptor';
import { PaymentFormComponent } from './components/dashboard/dashboard-body/dashboard-shopping-cart/payment-form/payment-form.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormShopHistoryComponent } from './components/dashboard/dashboard-body/dashboard-shopping-history/form-shop-history/form-shop-history.component';
import { ItemCommentsComponent } from './components/store/item-comments/item-comments.component';
import { FilterMailUserPipe } from './pipes/filter-mail-user.pipe';
import { FilterNameFacturasPipe } from './pipes/filter-name-facturas.pipe';
import { FilterDireccionFacturasPipe } from './pipes/filter-direccion-facturas.pipe';
import { FilterTotalFacturasPipe } from './pipes/filter-total-facturas.pipe';
import { DatePipe } from '@angular/common';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    SliderComponent,
    ExploreComponent,
    StoreComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ItemComponent,
    CartInfoComponent,
    DashboardComponent,
    FormPerfilComponent,
    DashboardMenuComponent,
    DashboardBodyComponent,
    DashboardHomeComponent,
    DashboardProfileComponent,
    DashboardProductsComponent,
    DashboardArticlesComponent,
    CopyrightComponent,
    DashboardStoreComponent,
    DashboardShoppingCartComponent,
    DashboardShoppingHistoryComponent,
    DashboardOrdersComponent,
    DashboardListUsersComponent,
    DashboardContactComponent,
    DashboardAnalyticsComponent,
    FormProductComponent,
    DeleteProductComponent,
    FilterNameProductPipe,
    FilterCategoryProductPipe,
    FormUserComponent,
    DeleteUserComponent,
    BannerAboutComponent,
    BannerContactComponent,
    BannerStoreComponent,
    PaymentFormComponent,
    FormShopHistoryComponent,
    ItemCommentsComponent,
    FilterMailUserPipe,
    FilterNameFacturasPipe,
    FilterDireccionFacturasPipe,
    FilterTotalFacturasPipe,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"e-commerce-ac291","appId":"1:566682991703:web:5212b1bfe3751f4e1a7712","storageBucket":"e-commerce-ac291.appspot.com","apiKey":"AIzaSyDsNszgfyNFvBOG21Eblu0wYmphnmGxbNs","authDomain":"e-commerce-ac291.firebaseapp.com","messagingSenderId":"566682991703"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenExpirationInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi:true},
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
