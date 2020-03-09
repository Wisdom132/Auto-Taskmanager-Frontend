import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PriorityService {
	getAllPriority() {
		return this.http.get(`${environment.baseURL}admin/list-priority`);
	}

	createPriority(data) {
		return this.http.post(`${environment.baseURL}admin/create-priority`, {
			name: data
		});
	}

	removePriority(id) {
		return this.http.delete(`${environment.baseURL}admin/remove-priority/${id}`);
	}
	constructor(private http: HttpClient) {}
}
