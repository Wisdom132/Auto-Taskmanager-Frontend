import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// bring in layout
import { DefaultComponent } from './layout/default/default.component';
import { BlankComponent } from './layout/blank/blank.component';
import { UserComponent } from './layout/user/user.component';
// layout ends here

//global
import { LoginComponent } from './components/login/login.component';

//user
import { ManagetaskComponent } from './components/user/managetask/managetask.component';

// bring in components
import { ProductsComponent } from './components/admin/products/products.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { AdduserComponent } from './components/admin/adduser/adduser.component';
import { ManagestatusComponent } from './components/admin/managestatus/managestatus.component';

import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
	{
		path: '',
		component: BlankComponent,
		children: [ { path: '', component: LoginComponent } ]
	},
	{
		path: 'user',
		component: UserComponent,
		children: [ { path: '', component: ManagetaskComponent } ]
	},
	{
		path: 'admin',
		component: DefaultComponent,
		canActivate: [ AdminGuard ],
		children: [
			{ path: 'products', component: ProductsComponent },
			{ path: 'users', component: UsersComponent },
			{ path: 'create-task', component: AddProductComponent },
			{ path: 'manage-role', component: RolesComponent },
			{ path: 'add-user', component: AdduserComponent },
			{ path: 'manage-status', component: ManagestatusComponent }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
