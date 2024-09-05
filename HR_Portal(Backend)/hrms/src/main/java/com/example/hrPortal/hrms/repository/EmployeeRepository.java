package com.example.hrPortal.hrms.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hrPortal.hrms.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
