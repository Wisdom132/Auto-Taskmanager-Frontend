import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: [ './users.component.css' ]
})
export class UsersComponent implements OnInit {
	constructor(private User: UserService, private Role: RoleService) {}

	//states
	users = [];
	roles = [];
	title: string = 'Add User';
	edit: boolean = false;
	userForm = new FormGroup({
		email: new FormControl(''),
		name: new FormControl(''),
		role: new FormControl(''),
		password: new FormControl('')
	});
	isLoading: boolean = false;
	isAdd: boolean = false;
	isEdit: boolean = false;
	isEditId: any = null;
	//states

	//methods
	initCreate() {
		this.title = 'Add User';
		this.edit = false;
		this.userForm.reset({});
	}
	getAllRoles() {
		this.isLoading = true;
		this.Role.getAllRoles().subscribe((data: any) => {
			this.roles = data.data;
			this.isLoading = false;
		});
	}
	getAllUsers() {
		this.isLoading = true;
		this.User.getAllUsers().subscribe((data: any) => {
			this.users = data.data;
			this.isLoading = false;
		});
	}
	createNewUser() {
		this.isAdd = true;
		this.User.createUser(this.userForm.value).subscribe(
			(data: any) => {
				this.getAllUsers();
				Swal.fire('Success', 'User Added', 'success');
				console.log(data);
				this.isAdd = false;
			},
			(err: HttpErrorResponse) => {
				console.log(err);
				this.isAdd = false;
				Swal.fire('Error', 'Something Went Wromg', 'error');
			}
		);
	}

	deleteUser(id) {
		this.isLoading = true;
		this.User.removeUser(id).subscribe((data: any) => {
			console.log(data);
			Swal.fire('Success', 'User Deleted', 'success');
			this.isLoading = false;
			this.getAllUsers();
		});
	}

	initUpdate(id) {
		this.title = 'Edit User';
		this.edit = true;
		this.userForm.patchValue(id);
		this.isEditId = id._id;
		// this.userForm.patchValue({
		// 	name: id.name,
		// 	email: id.email,
		// 	role: id.role._id
		// });
		console.log(id);
	}
	updateUserData() {
		this.isEdit = true;
		let data = {
			email: this.userForm.value.email,
			name: this.userForm.value.name,
			role: this.userForm.value.role._id
		};
		this.User.updateUser(this.isEditId, data).subscribe((data: any) => {
			console.log(data);
			this.getAllUsers();
			this.isEdit = false;
		});
	}
	//methods
	ngOnInit() {
		this.getAllUsers();
		this.getAllRoles();
	}
}
