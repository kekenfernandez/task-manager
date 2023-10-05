import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {}

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/lists', response._id]);
    });
  }
}
