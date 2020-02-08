import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-add-product',
	templateUrl: './add-product.component.html',
	styleUrls: [ './add-product.component.css' ]
})
export class AddProductComponent implements OnInit {
	constructor(private Task: TaskService) {}

	//methods
	getAllTask() {
		this.Task.getAllTask().subscribe((data: any) => {
			console.log(data);
		});
	}

	//methods
	ngOnInit() {
		this.getAllTask();
	}
}
