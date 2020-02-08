import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(private http: HttpClient) {}
	getAllTask() {
		return this.http.get(`${environment.baseURL}admin/list-tasks`);
	}

	createTask(data) {
		return this.http.post(
			`${environment.baseURL}admin/create-task`,
			{
				title: data.title,
				description: data.description,
				role: data.role
			},
			{ responseType: 'text' as 'json' }
		);
	}

	deleteTask(id) {
		return this.http.delete(`${environment.baseURL}/delete-task/${id}`);
	}

	updateTask(id, data) {
		return this.http.put(`${environment.baseURL}/update-task/${id}`, { data });
	}
}
