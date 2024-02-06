package com.task_service.entity;

public enum TaskStatus {

    PENDING("PENDING"),
    ASSIGNED("ASSIGNED"),
    DONE("DONE");

	private TaskStatus(String done) {
	}
}
