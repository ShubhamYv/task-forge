package com.task_service.service;

import java.util.List;

import com.task_service.entity.Task;
import com.task_service.entity.TaskStatus;

public interface TaskService {

	Task createTask(Task task, String requesterRole) throws Exception;

	Task getTaskById(Long id) throws Exception;

	List<Task> getAllTasks(TaskStatus status);

	Task updateTask(Long id, Task updatedTask, Long userId) throws Exception;

	void deleteTask(Long id) throws Exception;

	Task assignedToUser(Long userId, Long taskId) throws Exception;

	List<Task> assignedUserTask(Long userId, TaskStatus status);

	Task completeTask(Long taskId) throws Exception;
}
