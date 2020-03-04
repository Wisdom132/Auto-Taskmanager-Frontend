import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'app-userlogin',
	templateUrl: './userlogin.component.html',
	styleUrls: [ './userlogin.component.css' ]
})
export class UserloginComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	});
	constructor(private Auth: AuthService, private router: Router) {}

	onSubmit() {
		this.Auth.logUserIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
			(data: any) => {
				console.log(data);
				let token = data.token;
				let user = JSON.stringify(data.user);
				localStorage.setItem('token', token);
				localStorage.setItem('user', user);
				this.router.navigate([ '/user' ]);
			},
			(err: HttpErrorResponse) => {
				console.log({ error: err });
			}
		);
	}

	ngOnInit() {}
}
