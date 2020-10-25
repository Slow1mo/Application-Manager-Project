import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
export declare class TaskRepository extends Repository<Task> {
    getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]>;
    createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task>;
}
