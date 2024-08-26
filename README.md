Prerequisites
Java JDK: Ensure you have JDK installed.Download any LTS support(For this project I have used java 21).
Maven: Ensure Maven is installed for building the project.
Vs Code
Mysql(Workbench)
Node.js
Postman

# Steps
Clone the Repository
cd {repo-url}
Build the Project(for terminal)

mvn clean install
Run the Application

mvn spring-boot:run
Alternatively, you can run it from your IDE (e.g., Eclipse/Intellij) as a Java application.

Usage:

Access the Application: Open your web browser and navigate to http://localhost:3000 after setting up your project code on both backend(Eclipse/Intellij) and frontend(Vs Code).

# Check every endpoint at localhost:8082 using postman ,it should fetch the data.But first you have to add data into the tables.Refer the controller classes for the same.

For database-
setup the Mysql Workbench
create database and make ensure the username and password are correctly configured in application.properties file of your java appication(Eclipse/Intellij).

For frontend-
install node.js
use npm i
npm i axios(install other necessary packages also like bootstrap,react-router-dom).
npm start
