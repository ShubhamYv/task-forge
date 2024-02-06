package com.submission_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.submission_service.dto.TaskDto;
import com.submission_service.entity.Submission;
import com.submission_service.repository.SubmissionRepository;
import com.submission_service.service.SubmissionService;
import com.submission_service.service.TaskService;

@Service
public class SubmissionServiceImpl implements SubmissionService {

	@Autowired
	private SubmissionRepository submissionRepository;

	@Autowired
	private TaskService taskService;

	@Override
	public Submission submitTask(Long taskId, String gitHubhLink, Long userId, String jwt) throws Exception {
		TaskDto taskDto = taskService.getTaskById(taskId, jwt);
		if (null != taskDto) {
			Submission submission = new Submission();
			submission.setTaskId(taskId);
			submission.setUserId(userId);
			submission.setGitHubLink(gitHubhLink);
			submission.setSubmissionTime(LocalDateTime.now());
			return submissionRepository.save(submission);
		}
		throw new Exception("Task not found with id: " + taskId);
	}

	@Override
	public Submission getTaskSubmissionById(Long taskId) throws Exception {
		Submission submission = submissionRepository.findById(taskId)
				.orElseThrow(() -> new Exception("Task submission not found with id: " + taskId));
		return submission;
	}

	@Override
	public List<Submission> getAllTaskSubmission() {
		List<Submission> allSubmissions = submissionRepository.findAll();
		return allSubmissions;
	}

	@Override
	public List<Submission> getTaskSubmissionsByTaskId(Long taskId) {
		List<Submission> task = submissionRepository.findByTaskId(taskId);
		return task;
	}

	@Override
	public Submission acceptDeclinedSubmission(Long taskId, String status) throws Exception {
		Submission submission = getTaskSubmissionById(taskId);
		submission.setStatus(status);
		if (status.equalsIgnoreCase("ACCEPT")) {
			taskService.completeTask(submission.getTaskId());
		}
		return submissionRepository.save(submission);
	}

}
