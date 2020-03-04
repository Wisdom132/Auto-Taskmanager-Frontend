import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class RoleService {
	getAllRoles() {
		return this.http.get(`${environment.baseURL}admin/list-roles`);
	}

	createRole(data) {
		return this.http.post(`${environment.baseURL}admin/create-role`, {
			name: data
		});
	}

	removeRole(id) {
		return this.http.delete(`${environment.baseURL}admin/remove-role/${id}`);
	}
	constructor(private http: HttpClient) {}
}
