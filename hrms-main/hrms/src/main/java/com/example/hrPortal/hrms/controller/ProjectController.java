package com.example.hrPortal.hrms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hrPortal.hrms.model.Project;
import com.example.hrPortal.hrms.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@GetMapping
	public List<Project> getAllProjects(){
		return projectService.getAllProjects();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") Long id){
		Optional<Project> projects=projectService.getProjectById(id);
		return projects.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping
	public ResponseEntity<Project> createproject(@RequestBody Project project){
        Project savedProject = projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
	}
	
	 @PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable("id") Long id, @RequestBody Project project) {
       if (!projectService.getProjectById(id).isPresent()) {
	     return ResponseEntity.notFound().build();
     }
       project.setId(id);
	   Project updatedProject = projectService.saveProject(project);
	   return ResponseEntity.ok(updatedProject);
	 }
	
	 @DeleteMapping("/{id}")
	 public ResponseEntity<Void> deleteProject(@PathVariable("id") Long id){
	        if (!projectService.getProjectById(id).isPresent()) {
	            return ResponseEntity.notFound().build();
	        }
	        projectService.deleteProject(id);
	        return ResponseEntity.noContent().build();
	 }
	
}
