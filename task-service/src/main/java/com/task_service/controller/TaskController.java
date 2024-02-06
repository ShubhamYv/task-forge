package com.task_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task_service.dto.UserDto;
import com.task_service.entity.Task;
import com.task_service.entity.TaskStatus;
import com.task_service.service.TaskService;
import com.task_service.service.UserService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

	@Autowired
	private TaskService taskService;

	@Autowired
	private UserService userService;

	@PostMapping()
	public ResponseEntity<Task> createTask(@RequestBody Task task, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		UserDto user = userService.getUserProfile(jwt);
		Task createdTask = taskService.createTask(task, user.getRole());
		return new ResponseEntity<Task>(createdTask, HttpStatus.CREATED);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		Task task = taskService.getTaskById(id);
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}

	@GetMapping("/user")
	public ResponseEntity<List<Task>> getAssignedUserTask(
			@RequestParam(required = false) TaskStatus status, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		UserDto user = userService.getUserProfile(jwt);
		List<Task> tasks = taskService.assignedUserTask(user.getId(), status);
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
	}
	
	
	@GetMapping()
	public ResponseEntity<List<Task>> getAllTask(
			@RequestParam(required = false) TaskStatus status, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		List<Task> tasks = taskService.getAllTasks(status);
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
	}

	@PutMapping("/{taskId}/user/{userId}/assigned")
	public ResponseEntity<Task> assignedTaskToUser(
			@PathVariable Long taskId, @PathVariable Long userId, 
			@RequestHeader("Authorization") String jwt) throws Exception {
		Task tasks = taskService.assignedToUser(userId, taskId);
		return new ResponseEntity<Task>(tasks, HttpStatus.OK);
	}
	
	
	@PutMapping("/{taskId}")
	public ResponseEntity<Task> updateTask(
			@PathVariable Long taskId, 
			@RequestBody Task task,
			@RequestHeader("Authorization") String jwt) throws Exception {
		UserDto user = userService.getUserProfile(jwt);
		Task tasks = taskService.updateTask(taskId, task, user.getId());
		return new ResponseEntity<Task>(tasks, HttpStatus.OK);
	}
	
	
	@PutMapping("/{taskId}/completei")
	public ResponseEntity<Task> completeTask(
			@PathVariable Long taskId) throws Exception {
		Task tasks = taskService.completeTask(taskId);
		return new ResponseEntity<Task>(tasks, HttpStatus.OK);
	}
	
	@DeleteMapping("/{taskId}")
	public ResponseEntity<Void> deleteTask(
			@PathVariable Long taskId) throws Exception {
		taskService.deleteTask(taskId);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
}
