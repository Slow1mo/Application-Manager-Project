import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
    getTaskById(id: number, user: User): Promise<Task>;
    createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
    deleteTask(id: number, user: User): Promise<void>;
    updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task>;
}
