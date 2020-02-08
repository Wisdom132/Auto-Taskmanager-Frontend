import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class StatusService {
	getAllStatuses() {
		return this.http.get(`${environment.baseURL}admin/list-status`);
	}

	createStatus(data) {
		return this.http.post(`${environment.baseURL}admin/create-status`, {
			status: data
		});
	}

	removeStatus(id) {
		return this.http.delete(`${environment.baseURL}admin/remove-status/${id}`);
	}
	constructor(private http: HttpClient) {}
}
