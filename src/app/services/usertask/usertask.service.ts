import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class UsertaskService {
	constructor(private http: HttpClient) {}

	getTasksAssignedToUser(id) {
		return this.http.get(`${environment.baseURL}user/get-tasks/${id}`);
	}

	updateTaskStatus(id, status) {
		return this.http.patch(`${environment.baseURL}user/update-task-status/${id}`, { status: status });
	}
}
