import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "./partials/navbar/navbar.component";
import { FooterComponent } from "./partials/footer/footer.component";
import { SidebarComponent } from "./partials/sidebar/sidebar.component";
import { DefaultComponent } from "./layout/default/default.component";
import { BlankComponent } from "./layout/blank/blank.component";
import { ProductsComponent } from "./components/admin/products/products.component";
import { UsersComponent } from "./components/admin/users/users.component";
import { SubnavComponent } from "./partials/subnav/subnav.component";
import { LoginComponent } from "./components/login/login.component";
import { AddProductComponent } from "./components/admin/add-product/add-product.component";
import { RolesComponent } from "./components/admin/roles/roles.component";
import { AdduserComponent } from "./components/admin/adduser/adduser.component";
import { ManagestatusComponent } from "./components/admin/managestatus/managestatus.component";
import { UserComponent } from "./layout/user/user.component";
import { UserSidebarComponent } from "./partials/user-sidebar/user-sidebar.component";
import { ManagetaskComponent } from "./components/user/managetask/managetask.component";
import { UserloginComponent } from "./components/userlogin/userlogin.component";
import { LoaderComponent } from './partials/loader/loader.component';
// import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DefaultComponent,
    BlankComponent,
    ProductsComponent,
    UsersComponent,
    SubnavComponent,
    LoginComponent,
    AddProductComponent,
    RolesComponent,
    AdduserComponent,
    ManagestatusComponent,
    UserComponent,
    UserSidebarComponent,
    ManagetaskComponent,
    UserloginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
