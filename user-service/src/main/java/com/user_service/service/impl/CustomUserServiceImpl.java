package com.user_service.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.user_service.entity.User;
import com.user_service.repository.UserRepository;
import com.user_service.service.CustomUserService;

@Service
public class CustomUserServiceImpl implements CustomUserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if (null == user) {
			throw new UsernameNotFoundException("user not found with email " + username);
		}
		List<GrantedAuthority> authorities = new ArrayList<>();
		return new org.springframework.security.core.userdetails
				.User(user.getEmail(), user.getPassword(), authorities);
	}

}
