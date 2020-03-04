import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status/status.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UsertaskService } from '../../../services/usertask/usertask.service';
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
	name = new FormControl('');
	constructor(private status: StatusService, private task: UsertaskService) {}

	getStatus() {
		this.status.getAllStatuses().subscribe((data: any) => {
			this.allstatus = data.data;
			console.log(this.allstatus);
		});
	}
	getTaskAssingedToUser() {
		let userId = JSON.parse(localStorage.getItem('user'));
		this.task.getTasksAssignedToUser(userId._id).subscribe((data: any) => {
			this.tasks = data.tasks;
		});
	}

	initUpdate(id) {
		this.it_to_edit = id;
	}
	updateTaskStatus() {
		this.task.updateTaskStatus(this.it_to_edit._id, this.name.value).subscribe((data: any) => {
			console.log(data);
			this.getTaskAssingedToUser();
		});
	}
	ngOnInit() {
		this.getStatus();
		this.getTaskAssingedToUser();
	}
}
