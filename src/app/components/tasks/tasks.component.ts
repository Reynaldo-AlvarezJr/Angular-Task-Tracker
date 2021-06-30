import { Component, OnInit } from '@angular/core';
import { TaskService} from '../../services/task.service'
import { Task } from '../../Task';

// import { TASKS } from '../../mock-tasks';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  // tasks: Task[] = TASKS
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  // Void:This particular function don't return anything
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks) );
  }

  // filter should not be equal to the taskId
  deleteTask(task: Task){
    this.taskService.deleteTask(task).subscribe(() => (this.tasks = this.tasks.filter((t) => t.id !== task.id )) );
  }

  toggleReminder(task: Task){
    //set the task reminder to the opposite of what ever it is.
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
    // console.log(task.reminder);

  }

  addTask(task: Task){
    this.taskService.addTask(task).subscribe((task) => (this.tasks.push(task)) );
    // console.log(task);

  }


}
