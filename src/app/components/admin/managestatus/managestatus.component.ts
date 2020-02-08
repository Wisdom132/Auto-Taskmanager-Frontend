import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status/status.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	selector: 'app-managestatus',
	templateUrl: './managestatus.component.html',
	styleUrls: [ './managestatus.component.css' ]
})
export class ManagestatusComponent implements OnInit {
	constructor(private Status: StatusService) {}
	statuses: [];
	name = new FormControl('');
	getAllStatuses() {
		this.Status.getAllStatuses().subscribe((data: any) => {
			this.statuses = data.data;
		});
	}

	createNewStatus() {
		this.Status.createStatus(this.name.value).subscribe((data: any) => {
			console.log(data);
			this.getAllStatuses();
		});
	}

	deleteStatus(id) {
		this.Status.removeStatus(id).subscribe((response: any) => {
			console.log(response);
			this.getAllStatuses();
		});
	}

	ngOnInit() {
		this.getAllStatuses();
	}
}
