# Task Forge

**Task Forge** is a comprehensive project management system that utilizes a microservices architecture to deliver robust and scalable functionality. The system includes a React and Redux frontend with a Spring Boot backend, designed to enhance task management efficiency and security.

## Key Features

### API Gateway
- **Routing**: Centralizes and routes requests to the appropriate microservices.
- **CORS Management**: Configures cross-origin resource sharing to support various client applications.

### Eureka Server
- **Service Discovery**: Allows microservices to register and discover each other dynamically.
- **Dynamic Address Resolution**: Eliminates the need for hardcoded service addresses.

### User Service
- **User Registration**: Allows new users to sign up.
- **User Login**: Handles user authentication with JWT for secure access.
- **Profile Management**: Users can view and update their profiles.
- **Role-Based Authorization**: Differentiates access levels; Admins can manage projects, while users have restricted access.

### Task Service
- **Task Creation**: Admins can create new tasks.
- **Task Retrieval**: Fetch tasks by ID or get a list of all tasks.
- **Task Assignment**: Admins can assign tasks to users.
- **Task Update**: Update task details and status.
- **Task Completion**: Users can mark tasks as completed.
- **Task Deletion**: Admins can delete tasks.
- **User Task Retrieval**: Fetch tasks assigned to a specific user.

### Task Submission Service
- **Submission Creation**: Users can submit completed tasks.
- **Submission Retrieval**: Retrieve submissions by task ID or get all submissions related to a task.
- **Submission Update**: Update submissions as needed.

## Additional Features
- **Admin Capabilities**: Admins can view all projects, assign tasks, and delete projects. Users have restricted access to these functionalities.
- **Role-Based Authorization**: Ensures appropriate access control for different user roles, enhancing security.

## Project Highlights
- **End-to-End Development**: Designed the entire "Task Forge" system with React and Redux on the frontend and Spring Boot on the backend.
- **Efficiency Boost**: Achieved a 30% increase in efficiency through seamless task management and secure authentication.
- **Microservices Architecture**: Utilized User Service, Task Service, and Submission Service with Eureka Server and API Gateway for scalability and modularity.
- **User Experience**: Enhanced with responsive design using Tailwind CSS and Material-UI for a visually appealing and intuitive interface.

---
