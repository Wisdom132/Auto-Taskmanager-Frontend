import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	});
	constructor(private Auth: AuthService) {}

	onSubmit() {
		this.Auth.logUserIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
			(data: any) => {
				console.log(data);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			}
		);
	}

	ngOnInit() {}
}
