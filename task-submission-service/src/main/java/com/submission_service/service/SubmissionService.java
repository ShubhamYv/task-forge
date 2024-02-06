package com.submission_service.service;

import java.util.List;

import com.submission_service.entity.Submission;

public interface SubmissionService {

	Submission getTaskSubmissionById(Long taskId) throws Exception;

	List<Submission> getAllTaskSubmission();

	List<Submission> getTaskSubmissionsByTaskId(Long taskId);

	Submission acceptDeclinedSubmission(Long taskId, String status) throws Exception;

	Submission submitTask(Long taskId, String gitHubhLink, Long userId, String jwt) throws Exception;
}
