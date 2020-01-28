import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	readonly baseURL: string = 'https://autotaskmanager.herokuapp.com/';
	constructor(private http: HttpClient) {}
	logUserIn(email, password) {
		return this.http.post(
			`${this.baseURL}admin/login`,
			{
				email,
				password
			},
			{ responseType: 'text' as 'json' }
		);
	}
}
