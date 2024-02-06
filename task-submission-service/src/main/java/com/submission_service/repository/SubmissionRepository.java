package com.submission_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.submission_service.entity.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

	List<Submission> findByTaskId(Long taskId);
}
