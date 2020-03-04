import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from '../../../services/role/role.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [ './add-product.component.css' ]
})
export class AddProductComponent implements OnInit {
	constructor(private Task: TaskService, private Role: RoleService) {}
	roles: any = [];
	tasks: any = [];
	edit: boolean = false;
	title: string = 'Add Task';
	dataToUpdate: any = null;
	taskForm = new FormGroup({
		title: new FormControl(''),
		role: new FormControl(''),
		description: new FormControl('')
	});
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
		this.taskForm.patchValue({
			title: id.title,
			role: id.role,
			description: id.description
		});
		console.log(id.role._id);
	}
	updateTaskData() {
		this.Task.updateTask(this.dataToUpdate._id, this.taskForm.value).subscribe(
			(data: any) => {
				console.log(data);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			}
		);
	}
	getAllRoles() {
		this.Role.getAllRoles().subscribe((data: any) => {
			this.roles = data.data;
		});
	}
	getAllTask() {
		this.Task.getAllTask().subscribe((data: any) => {
			this.tasks = data;
		});
	}
	deleteTask(id) {
		this.Task.deleteTask(id).subscribe(
			(data: any) => {
				console.log(data);
				this.getAllTask();
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			}
		);
	}

	addTask() {
		this.Task.createTask(this.taskForm.value).subscribe(
			(data: any) => {
				console.log(data);
				this.getAllTask();
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			}
		);
	}

	//methods ends here
	ngOnInit() {
		this.getAllTask();
		this.getAllRoles();
	}
}
