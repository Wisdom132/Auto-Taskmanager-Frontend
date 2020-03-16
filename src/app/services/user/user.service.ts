import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) {}
	getAllUsers() {
		return this.http.get(`${environment.baseURL}admin/list-users`);
	}

	createUser(data) {
		return this.http.post(`${environment.baseURL}admin/register-user`, {
			email: data.email,
			name: data.name,
			role: data.role,
			password: data.password
		});
	}
	updateUser(id, data) {
		return this.http.put(`${environment.baseURL}admin/user/${id}`, {
			data
		});
	}

	removeUser(id) {
		return this.http.delete(`${environment.baseURL}admin/remove-user/${id}`);
	}
}
