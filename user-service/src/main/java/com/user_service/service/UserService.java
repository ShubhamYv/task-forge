package com.user_service.service;

import java.util.List;

import com.user_service.entity.User;

public interface UserService {

	User getUserProfile(String jwt);

	List<User> getAllUsers();
}
