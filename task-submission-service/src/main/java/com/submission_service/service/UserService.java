package com.submission_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import com.submission_service.dto.UserDto;

@FeignClient(name = "USER-SERVICE", url = "http://localhost:5001")
public interface UserService {

	@GetMapping("/api/users/profile")
	UserDto getUserProfile(@RequestHeader("Authorization") String jwt);

}
