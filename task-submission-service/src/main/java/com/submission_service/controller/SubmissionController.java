package com.submission_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.submission_service.dto.UserDto;
import com.submission_service.entity.Submission;
import com.submission_service.service.SubmissionService;
import com.submission_service.service.UserService;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

	@Autowired
	private SubmissionService submissionService;

	@Autowired
	private UserService userService;

//	@Autowired
//	private TaskService taskService;

	@PostMapping()
	public ResponseEntity<Submission> submitTask(@RequestParam Long taskId,
			@RequestParam String gitHubhLink,
			@RequestHeader("Authorization") String jwt
			) throws Exception {
		UserDto user = userService.getUserProfile(jwt);
		Submission submitTask = submissionService.submitTask(taskId, gitHubhLink, user.getId(), jwt);
		return new ResponseEntity<Submission>(submitTask, HttpStatus.CREATED);
	}

	@GetMapping("/{taskId}")
	public ResponseEntity<Submission> getTaskSubmissionById(@PathVariable Long taskId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		Submission taskSubmission = submissionService.getTaskSubmissionById(taskId);
		return new ResponseEntity<Submission>(taskSubmission, HttpStatus.OK);
	}

	@GetMapping()
	public ResponseEntity<List<Submission>> getAllSubmissions(@RequestHeader("Authorization") String jwt)
			throws Exception {
		List<Submission> allTaskSubmission = submissionService.getAllTaskSubmission();
		return new ResponseEntity<List<Submission>>(allTaskSubmission, HttpStatus.OK);
	}
	
	
	@GetMapping("/task/{taskId}")
	public ResponseEntity<List<Submission>> getAllSubmissionsByTaskId(@PathVariable Long taskId,
			@RequestHeader("Authorization") String jwt)
			throws Exception {
		List<Submission> allTaskSubmission = submissionService.getTaskSubmissionsByTaskId(taskId);
		return new ResponseEntity<List<Submission>>(allTaskSubmission, HttpStatus.OK);
	}
	
	@PutMapping("/{taskId}")
	public ResponseEntity<Submission> acceptDeclinedSubmission(@PathVariable Long taskId,
			@RequestParam String status,
			@RequestHeader("Authorization") String jwt)
			throws Exception {
		Submission submission = submissionService.acceptDeclinedSubmission(taskId, status);
		return new ResponseEntity<Submission>(submission, HttpStatus.OK);
	}
}
