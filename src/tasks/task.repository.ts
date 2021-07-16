import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(
    user: User,
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { name, createdat } = createTaskDto;

    const task = new Task();
    task.name = name;
    task.createdat = createdat;
  
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
}
