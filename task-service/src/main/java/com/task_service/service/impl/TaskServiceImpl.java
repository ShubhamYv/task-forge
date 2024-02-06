package com.task_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.task_service.entity.Task;
import com.task_service.entity.TaskStatus;
import com.task_service.repository.TaskRepository;
import com.task_service.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public Task createTask(Task task, String requesterRole) throws Exception {
		if (!requesterRole.equals("ROLE_ADMIN")) {
			throw new Exception("only admin can create task...");
		}
		task.setStatus(TaskStatus.PENDING);
		task.setCreatedAt(LocalDateTime.now());
		return taskRepository.save(task);
	}

	@Override
	public Task getTaskById(Long id) throws Exception {
		Task task = taskRepository.findById(id).orElseThrow(() -> new Exception("Task not found with id: " + id));
		return task;
	}

	@Override
	public List<Task> getAllTasks(TaskStatus status) {
		List<Task> allTasks = taskRepository.findAll();
		List<Task> filteredTask = allTasks.stream()
				.filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString()))
				.collect(Collectors.toList());
		return filteredTask;
	}

	@Override
	public Task updateTask(Long taskId, Task updatedTask, Long userId) throws Exception {
		Task task = getTaskById(taskId);
		if (null != updatedTask.getTitle()) {
			task.setTitle(updatedTask.getTitle());
		}

		if (null != updatedTask.getDescription()) {
			task.setDescription(updatedTask.getDescription());
		}

		if (null != updatedTask.getImage()) {
			task.setImage(updatedTask.getImage());
		}

		if (null != updatedTask.getTags()) {
			task.setTags(updatedTask.getTags());
		}

		if (null != updatedTask.getDeadline()) {
			task.setDeadline(updatedTask.getDeadline());
		}

		return taskRepository.save(task);
	}

	@Override
	public void deleteTask(Long id) throws Exception {
		getTaskById(id);
		taskRepository.deleteById(id);

	}

	@Override
	public Task assignedToUser(Long userId, Long taskId) throws Exception {
		Task task = getTaskById(taskId);
		task.setAssignedUserId(userId);
		task.setStatus(TaskStatus.ASSIGNED);
		return taskRepository.save(task);
	}

	@Override
	public List<Task> assignedUserTask(Long userId, TaskStatus status) {
		List<Task> allTasks = taskRepository.findByAssignedUserId(userId);
		List<Task> filteredTasks = allTasks.stream()
				.filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString()))
				.collect(Collectors.toList());
		return filteredTasks;
	}

	@Override
	public Task completeTask(Long taskId) throws Exception {
		Task task = getTaskById(taskId);
		task.setStatus(TaskStatus.DONE);
		return taskRepository.save(task);
	}

}
