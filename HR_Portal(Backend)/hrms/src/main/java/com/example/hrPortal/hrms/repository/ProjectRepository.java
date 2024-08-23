package com.example.hrPortal.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hrPortal.hrms.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Long> {

	
}
