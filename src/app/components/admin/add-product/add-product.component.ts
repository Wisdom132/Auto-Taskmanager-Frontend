import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { PriorityService } from '../../../services/priority/priority.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../../services/role/role.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [ './add-product.component.css' ]
})
export class AddProductComponent implements OnInit {
	constructor(private Task: TaskService, private Role: RoleService, private Priority: PriorityService) {}
	roles: any = [];
	priorities: any = [];
	tasks: any = [];
	edit: boolean = false;
	title: string = 'Add Task';
	dataToUpdate: any = null;
	taskForm = new FormGroup({
		title: new FormControl(''),
		role: new FormControl(''),
		description: new FormControl(''),
		priority: new FormControl('')
	});
	isLoad: boolean = false;
	buttonLoad: boolean = false;
	addLoad: boolean = false;
	updateLoad: boolean = false;
	//methods
	initCreate() {
		this.title = 'Add Task';
		this.edit = false;
		this.taskForm.reset({});
	}
	initUpdate(id) {
		console.log(id);
		this.title = 'Edit Task';
		this.edit = true;
		this.dataToUpdate = id;
		this.taskForm.patchValue(id);

		console.log(id.role._id);
	}
	updateTaskData() {
		this.updateLoad = true;
		this.Task.updateTask(this.dataToUpdate._id, this.taskForm.value).subscribe(
			(data: any) => {
				Swal.fire('Success', 'Task Updated', 'success');
				this.updateLoad = false;
				this.getAllTask();
				console.log(data);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
				Swal.fire('Error', 'Something Went Wrong', 'error');
				this.updateLoad = false;
			}
		);
	}
	getAllRoles() {
		this.Role.getAllRoles().subscribe((data: any) => {
			this.roles = data.data;
		});
	}

	getAllPrioties() {
		this.Priority.getAllPriority().subscribe((data: any) => {
			this.priorities = data.data;
		});
	}
	getAllTask() {
		this.isLoad = true;
		this.Task.getAllTask().subscribe((data: any) => {
			this.tasks = data.reverse();
			this.isLoad = false;
		});
	}
	deleteTask(id) {
		this.isLoad = true;
		this.Task.deleteTask(id).subscribe(
			(data: any) => {
				console.log(data);
				this.isLoad = false;
				Swal.fire('Success', 'Task Deleted', 'success');
				this.getAllTask();
			},
			(err: HttpErrorResponse) => {
				this.isLoad = false;
				Swal.fire('Success', 'Something Went Wrong', 'error');
				console.log(err);
			}
		);
	}

	addTask() {
		this.addLoad = true;
		this.Task.createTask(this.taskForm.value).subscribe(
			(data: any) => {
				console.log(data);
				this.addLoad = false;
				Swal.fire('Success', 'Task Created and Assigned To USer', 'success');
				this.getAllTask();
			},
			(err: HttpErrorResponse) => {
				this.addLoad = false;
				if (err.error.message) {
					Swal.fire('Error', err.error.message, 'error');
				} else {
					Swal.fire('Error', 'Something Went Wrong', 'error');
				}
			}
		);
	}

	//methods ends here
	ngOnInit() {
		this.getAllTask();
		this.getAllRoles();
		this.getAllPrioties();
	}
}
