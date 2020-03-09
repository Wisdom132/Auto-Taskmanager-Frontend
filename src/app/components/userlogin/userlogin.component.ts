import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.css"]
})
export class UserloginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  isLoading: boolean = false;
  constructor(private Auth: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.Auth.logUserIn(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe(
      (data: any) => {
        this.isLoading = false;
        console.log(data);
        let token = data.token;
        let user = JSON.stringify(data.user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        this.router.navigate(["/user"]);
        Swal.fire("Success", "Login Successful", "success");
      },
      (err: HttpErrorResponse) => {
        this.isLoading = false;
        Swal.fire("Error", "Wrong Login Details", "error");
        console.log({ error: err });
      }
    );
  }

  ngOnInit() {}
}
