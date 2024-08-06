package com.example.hrPortal.hrms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrPortal.hrms.model.Project;
import com.example.hrPortal.hrms.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository; 
	
	public List<Project> getAllProjects(){
		return projectRepository.findAll();
	}
	
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
	
}
