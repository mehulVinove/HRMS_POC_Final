Prerequisites
Java JDK: Ensure you have JDK 21 or higher installed.
Maven: Ensure Maven is installed for building the project.
Mysql(Workbench)
Node.js
Postman
Steps
Clone the Repository

git clone https://github.com/yourusername/your-repo.git

cd your-repo
Build the Project(for terminal)

mvn clean install
Run the Application

mvn spring-boot:run
Alternatively, you can run it from your IDE (e.g., Eclipse) as a Spring Boot application.

Usage
Provide examples of how to use the application. For instance:

Access the Application: Open your web browser and navigate to http://localhost:8082/.

Functionality: Describe key functionalities and how to interact with them.

Configuration
Explain how to configure the application. This might include environment variables, application properties, or configuration files.

Application Properties: If your application uses an application.properties or application.yml file, describe key settings and how to modify them.

For database-
setup the Mysql Workbench
create database and make ensure the username and password are correctly configured in application.properties file of your java appication(Eclipse).

For frontend-
use npm i
npm i axios(install necessary packages apart from axios if necessary).
npm start(make sure node.js is installed).
