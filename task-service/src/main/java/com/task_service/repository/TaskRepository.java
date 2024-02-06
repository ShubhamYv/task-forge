package com.task_service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.task_service.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

	public List<Task> findByAssignedUserId(Long userId);
}
