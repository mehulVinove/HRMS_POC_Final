package com.example.hrPortal.hrms.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.hrPortal.hrms.model.Candidate;
import com.example.hrPortal.hrms.model.Employee;
import com.example.hrPortal.hrms.model.HR;
import com.example.hrPortal.hrms.model.Project;
import com.example.hrPortal.hrms.service.CandidateService;
import com.example.hrPortal.hrms.service.EmployeeService;
import com.example.hrPortal.hrms.service.HrService;
import com.example.hrPortal.hrms.service.ProjectService;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private HrService hrService;
    @Autowired
	private ProjectService projectService;
    

    @PostMapping("/candidates")
    public ResponseEntity<?> createCandidate(@RequestBody Candidate candidate) {
        Candidate savedCandidate = candidateService.saveCandidate(candidate);
        return ResponseEntity.ok(savedCandidate);
    }
    
    
//    @PutMapping("/candidates/{id}")
//    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidateDetails) {
//        Candidate updatedCandidate = candidateService.updateCandidate(id, candidateDetails);
//        if (updatedCandidate == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(updatedCandidate);
//    }
    @PutMapping("/candidates/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidateDetails) {
        try {
            Candidate updatedCandidate = candidateService.updateCandidate(id, candidateDetails);
            return ResponseEntity.ok(updatedCandidate);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();  // Return 404 if candidate not found
        }
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        List<Candidate> candidates = candidateService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }
    
    // New DELETE endpoint
    @DeleteMapping("/candidates/{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
        boolean isRemoved = candidateService.deleteCandidate(id);
        if (isRemoved) {
            return ResponseEntity.ok("Candidate deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Candidate not found.");
        }
    }
    
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        Employee savedEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.ok(savedEmployee);
    }
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }
    
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(employee);
    }
    
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
        if (updatedEmployee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/hr")
    public ResponseEntity<List<HR>> getAllHrs() {
        List<HR> hr = hrService.getAllHRs();
        return ResponseEntity.ok(hr);
    }
    
    @PostMapping("/hr")
    public ResponseEntity<HR> createHR(@RequestBody HR hr) {
        HR savedHR = hrService.saveHR(hr);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedHR);
    }
    
    @PutMapping(path = "/hr/{id}")
    public ResponseEntity<HR> updateHR(@PathVariable Long id, @RequestBody HR hrDetails) {
        HR updatedHR = hrService.updateHR(id, hrDetails);
        if (updatedHR == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedHR);
    }
    
    @DeleteMapping(path = "/hr/{id}")
    public ResponseEntity<Void> deleteHR(@PathVariable Long id) {
        hrService.deleteHR(id);
        return ResponseEntity.noContent().build();
    }
   
    
	@GetMapping("/projects")
	public List<Project> getAllProjects(){
		return projectService.getAllProjects();
	}
	
	@GetMapping("/projects/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") Long id){
		Optional<Project> projects=projectService.getProjectById(id);
		return projects.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping("/projects")
	public ResponseEntity<Project> createproject(@RequestBody Project project){
        Project savedProject = projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProject);
	}
	
	 @PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable("id") Long id, @RequestBody Project project) {
       if (!projectService.getProjectById(id).isPresent()) {
	     return ResponseEntity.notFound().build();
     }
       project.setId(id);
	   Project updatedProject = projectService.saveProject(project);
	   return ResponseEntity.ok(updatedProject);
	 }
	 
	 @DeleteMapping("/projects/{id}")
	 public ResponseEntity<Void> deleteProject(@PathVariable("id") Long id){
	        if (!projectService.getProjectById(id).isPresent()) {
	            return ResponseEntity.notFound().build();
	        }
	        projectService.deleteProject(id);
	        return ResponseEntity.noContent().build();
	 }

}
