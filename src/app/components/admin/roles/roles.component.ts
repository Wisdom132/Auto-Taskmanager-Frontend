import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role/role.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'app-roles',
	templateUrl: './roles.component.html',
	styleUrls: [ './roles.component.css' ]
})
export class RolesComponent implements OnInit {
	roles = [];
	name = new FormControl('');
	constructor(private Role: RoleService) {}
	getAllRoles() {
		this.Role.getAllRoles().subscribe((data: any) => {
			this.roles = data.data;
		});
	}

	createNewRole() {
		this.Role.createRole(this.name.value).subscribe((response: any) => {
			console.log(response);
			this.getAllRoles();
		});
	}

	removeRole(id) {
		this.Role.removeRole(id).subscribe((response: any) => {
			this.getAllRoles();
			console.log(response);
		});
	}

	ngOnInit() {
		this.getAllRoles();
	}
}
