import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status/status.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsertaskService } from '../../../services/usertask/usertask.service';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-managetask',
	templateUrl: './managetask.component.html',
	styleUrls: [ './managetask.component.css' ]
})
export class ManagetaskComponent implements OnInit {
	title: string = 'Update Task';
	allstatus: any = [];
	tasks: any = [];
	it_to_edit: any = null;

	updateForm = new FormGroup({
		status: new FormControl(''),
		startDate: new FormControl(''),
		completeDate: new FormControl('')
	});

	isLoading: boolean = false;
	isEdit: boolean = false;

	constructor(private status: StatusService, private task: UsertaskService) {}

	getStatus() {
		this.status.getAllStatuses().subscribe((data: any) => {
			this.allstatus = data.data;
			console.log(this.allstatus);
		});
	}
	getTaskAssingedToUser() {
		this.isLoading = true;
		let userId = JSON.parse(localStorage.getItem('user'));
		this.task.getTasksAssignedToUser(userId._id).subscribe((data: any) => {
			this.tasks = data.tasks;
			this.isLoading = false;
		});
	}

	initUpdate(id) {
		this.it_to_edit = id;
		this.updateForm.patchValue({
			status: id.status,
			startDate: id.startDate,
			completeDate: id.completeDate
		});
	}
	updateTaskStatus() {
		this.isEdit = true;
		console.log(this.updateForm.value);
		this.task.updateTaskStatus(this.it_to_edit._id, this.updateForm.value).subscribe(
			(data: any) => {
				this.isEdit = false;
				Swal.fire('Success', 'Task Status Updated', 'success');
				console.log(data);
				this.getTaskAssingedToUser();
			},
			(err: HttpErrorResponse) => {
				console.log(err);
				this.isEdit = false;
				Swal.fire('Error', 'Something Went Wrong', 'error');
			}
		);
	}
	ngOnInit() {
		this.getStatus();
		this.getTaskAssingedToUser();
	}
}
