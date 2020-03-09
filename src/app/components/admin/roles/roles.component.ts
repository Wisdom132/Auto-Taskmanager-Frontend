import { Component, OnInit } from "@angular/core";
import { RoleService } from "../../../services/role/role.service";
import { FormGroup, FormControl } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"]
})
export class RolesComponent implements OnInit {
  roles = [];
  isAdd: boolean = false;
  isLoading: boolean = false;
  name = new FormControl("");
  constructor(private Role: RoleService) {}
  getAllRoles() {
    this.isLoading = true;
    this.Role.getAllRoles().subscribe((data: any) => {
      this.isLoading = false;
      this.roles = data.data;
    });
  }

  createNewRole() {
    this.isAdd = true;
    this.Role.createRole(this.name.value).subscribe((response: any) => {
      console.log(response);

      Swal.fire("Success", "New Role Added", "success");
      this.isAdd = false;
      this.getAllRoles();
    });
  }

  removeRole(id) {
    this.isLoading = true;
    this.Role.removeRole(id).subscribe((response: any) => {
      this.getAllRoles();
      Swal.fire("Sucesss", "Role Removed", "success");
      this.isLoading = false;
      console.log(response);
    });
  }

  ngOnInit() {
    this.getAllRoles();
  }
}
