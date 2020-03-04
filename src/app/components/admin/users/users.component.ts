import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { RoleService } from '../../../services/role/role.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
	//states

	//methods
	initCreate() {
		this.title = 'Add User';
		this.edit = false;
		this.userForm.reset({});
	}
	getAllRoles() {
		this.Role.getAllRoles().subscribe((data: any) => {
			this.roles = data.data;
		});
	}
	getAllUsers() {
		this.User.getAllUsers().subscribe((data: any) => {
			this.users = data.data;
		});
	}
	createNewUser() {
		this.User.createUser(this.userForm.value).subscribe(
			(data: any) => {
				this.getAllUsers();
				console.log(data);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			}
		);
	}
	updateUserData() {}

	deleteUser(id) {
		this.User.removeUser(id).subscribe((data: any) => {
			console.log(data);
			this.getAllUsers();
		});
	}

	initUpdate(id) {
		this.title = 'Edit User';
		this.edit = true;
		this.userForm.patchValue({
			name: id.name,
			email: id.email,
			role: id.role._id
		});
		console.log(id.role._id);
	}
	//methods
	ngOnInit() {
		this.getAllUsers();
		this.getAllRoles();
	}
}
