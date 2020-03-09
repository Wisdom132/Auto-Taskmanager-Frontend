import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  loading: boolean = false;
  constructor(private Auth: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.Auth.logAdminIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe(
      (data: any) => {
        Swal.fire("Succes", "Login Successful", "success");
        let token = data.token;
        let user = data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        this.router.navigate(["/admin/create-task"]);
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        console.log({ error: err });
        this.loading = false;
        Swal.fire("Error", "Wrong Login Details", "error");
      }
    );
  }

  ngOnInit() {}
}
