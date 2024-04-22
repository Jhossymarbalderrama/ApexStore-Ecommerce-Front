import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StoreComponent } from './components/store/store.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ItemComponent } from './components/store/item/item.component';
import { CartInfoComponent } from './components/cart-info/cart-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-body/dashboard-home/dashboard-home.component';
import { DashboardProfileComponent } from './components/dashboard/dashboard-body/dashboard-profile/dashboard-profile.component';
import { DashboardProductsComponent } from './components/dashboard/dashboard-body/dashboard-products/dashboard-products.component';
import { DashboardArticlesComponent } from './components/dashboard/dashboard-body/dashboard-articles/dashboard-articles.component';
import { DashboardShoppingCartComponent } from './components/dashboard/dashboard-body/dashboard-shopping-cart/dashboard-shopping-cart.component';
import { DashboardStoreComponent } from './components/dashboard/dashboard-body/dashboard-store/dashboard-store.component';
import { DashboardShoppingHistoryComponent } from './components/dashboard/dashboard-body/dashboard-shopping-history/dashboard-shopping-history.component';
import { DashboardOrdersComponent } from './components/dashboard/dashboard-body/dashboard-orders/dashboard-orders.component';
import { DashboardListUsersComponent } from './components/dashboard/dashboard-body/dashboard-list-users/dashboard-list-users.component';
import { DashboardAnalyticsComponent } from './components/dashboard/dashboard-body/dashboard-analytics/dashboard-analytics.component';
import { DashboardContactComponent } from './components/dashboard/dashboard-body/dashboard-contact/dashboard-contact.component';
import { PaymentFormComponent } from './components/dashboard/dashboard-body/dashboard-shopping-cart/payment-form/payment-form.component';

const routes: Routes = [

  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "store", component: StoreComponent },
  { path: "store/item/:id", component: ItemComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "cart-info", component: CartInfoComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, children:[
    { path: "home", component: DashboardHomeComponent},
    { path: "profile", component: DashboardProfileComponent},
    { path: "shopping-cart", component: DashboardShoppingCartComponent},
    { path: "products", component: DashboardProductsComponent},
    { path: "store", component: DashboardStoreComponent},
    { path: "store/item/:id", component: ItemComponent},
    { path: "shopping-history", component: DashboardShoppingHistoryComponent},
    { path: "articles", component: DashboardArticlesComponent},
    { path: "orders", component: DashboardOrdersComponent},
    { path: "list-users", component: DashboardListUsersComponent},
    { path: "analytics", component: DashboardAnalyticsComponent},
    { path: "contact", component: DashboardContactComponent},    
    {path: "payment-form",component: PaymentFormComponent},
    { path: "**", component: DashboardHomeComponent}
  ]},
  {path:"**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
