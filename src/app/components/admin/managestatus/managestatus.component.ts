import { Component, OnInit } from "@angular/core";
import { StatusService } from "src/app/services/status/status.service";
import { FormGroup, FormControl } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-managestatus",
  templateUrl: "./managestatus.component.html",
  styleUrls: ["./managestatus.component.css"]
})
export class ManagestatusComponent implements OnInit {
  constructor(private Status: StatusService) {}
  statuses: [];
  name = new FormControl("");
  isAdd: boolean = false;
  isLoading: boolean = false;
  getAllStatuses() {
    this.isLoading = true;
    this.Status.getAllStatuses().subscribe((data: any) => {
      this.statuses = data.data;
      this.isLoading = false;
    });
  }

  createNewStatus() {
    this.isAdd = true;
    this.Status.createStatus(this.name.value).subscribe((data: any) => {
      console.log(data);
      Swal.fire("Success", "New Status Added", "success");
      this.getAllStatuses();
      this.isAdd = false;
    });
  }

  deleteStatus(id) {
    this.isLoading = true;
    this.Status.removeStatus(id).subscribe((response: any) => {
      console.log(response);
      Swal.fire("Success", "Status Removed", "success");
      this.getAllStatuses();
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getAllStatuses();
  }
}
