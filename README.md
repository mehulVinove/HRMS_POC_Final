HRMS Portal
Overview
The HRMS Portal is a comprehensive Human Resource Management System designed to streamline HR operations. It includes features for managing employee profiles, recruitment, candidate tracking, and project management. This application is built using Spring Boot, Hibernate, MySQL, and Angular.

Table of Contents
Features
Technologies
Installation
Usage
Configuration
Running Tests
Contributing
License
Contact
Features
Employee Management: Add, update, and delete employee profiles.
Recruitment: Manage job postings and candidate applications.
Candidate Tracking: Track candidate stages and manage profiles.
Project Management: Manage ongoing projects and assign employees.
Technologies
Backend:
Spring Boot
Hibernate
MySQL
Frontend:
Angular 8
Build Tools:
Maven
Testing:
JUnit
Mockito
Installation
Prerequisites
Java JDK 21: Ensure you have JDK 21 or higher installed.
Maven: Ensure Maven is installed. You can download it from Maven’s official website.
MySQL: Ensure MySQL is installed and running. You can download it from MySQL’s official website.
Steps
Clone the Repository

Open a terminal and run:

bash
Copy code
git clone https://github.com/yourusername/hrms-portal.git
cd hrms-portal
Configure the Database

Create a Database: Log in to MySQL and create a database for the application:

sql
Copy code
CREATE DATABASE hrms_db;
Update Database Configuration: Edit src/main/resources/application.properties to include your MySQL credentials:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/hrms_db
spring.datasource.username=your_username
spring.datasource.password=your_password
Build the Project

Run the following command to build the project:

bash
Copy code
mvn clean install
Run the Application

You can run the application using Maven:

bash
Copy code
mvn spring-boot:run
Alternatively, you can run it from your IDE (e.g., Eclipse) by selecting the main class (typically annotated with @SpringBootApplication) and running it as a Spring Boot application.

Usage
Access the Application: Open your web browser and navigate to http://localhost:8080/ to access the HRMS Portal.

Features and Endpoints:

Employee Management: Access employee profiles and manage them through the UI.
Recruitment: Post new job openings and manage applications.
Candidate Tracking: Track candidate stages and update their status.
Configuration
Application Properties: You can customize various application settings in src/main/resources/application.properties. For example:

properties
Copy code
server.port=8080
logging.level.org.springframework=INFO
Environment Variables: Set environment variables if needed for deployment. For example, you might want to configure the JAVA_HOME and DATABASE_URL.
