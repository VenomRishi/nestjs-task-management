import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';  
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';


@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDTO: GetTasksFilterDTO
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDTO: CreateTaskDTO
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }
  

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, taskStatus);
  }
}
