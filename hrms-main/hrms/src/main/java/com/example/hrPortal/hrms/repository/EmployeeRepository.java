package com.example.hrPortal.hrms.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hrPortal.hrms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
