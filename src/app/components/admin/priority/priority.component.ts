import { Component, OnInit } from '@angular/core';
import { PriorityService } from '../../../services/priority/priority.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-priority',
	templateUrl: './priority.component.html',
	styleUrls: [ './priority.component.css' ]
})
export class PriorityComponent implements OnInit {
	priorities = [];
	isAdd: boolean = false;
	isLoading: boolean = false;
	name = new FormControl('');

	constructor(private prioriy: PriorityService) {}
	getAllPriorities() {
		this.isLoading = true;
		this.prioriy.getAllPriority().subscribe((data: any) => {
			this.isLoading = false;
			this.priorities = data.data;
			console.log(data.data);
		});
	}

	createNewPriority() {
		this.isAdd = true;
		this.prioriy.createPriority(this.name.value).subscribe((response: any) => {
			console.log(response);

			Swal.fire('Success', 'New Priority Added', 'success');
			this.isAdd = false;
			this.getAllPriorities();
		});
	}

	removePriority(id) {
		this.isLoading = true;
		this.prioriy.removePriority(id).subscribe((response: any) => {
			this.getAllPriorities();
			Swal.fire('Sucesss', 'Priority Removed', 'success');
			this.isLoading = false;
			console.log(response);
		});
	}

	ngOnInit() {
		this.getAllPriorities();
	}
}
