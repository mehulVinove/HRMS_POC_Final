package com.example.hrPortal.hrms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hrPortal.hrms.model.Candidate;
import com.example.hrPortal.hrms.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

	 @Autowired
	    private CandidateService candidateService;

	    @GetMapping
	    public List<Candidate> getAllCandidates() {
	        return candidateService.getAllCandidates();
	    }

	    @PostMapping
	    public Candidate addCandidate(@RequestBody Candidate candidate) {
	        return candidateService.saveCandidate(candidate);
	    }
	    
	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
	        try {
	            candidateService.deleteCandidate(id);
	            return ResponseEntity.ok().build();
	        } catch (Exception e) {
	            // Log the exception (optional)
	            // e.printStackTrace();
	            return ResponseEntity.status(500).build();
	        }
	    }
	    
	    
	    @PutMapping("/{id}")
	    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
	        Candidate existingCandidate = candidateService.getCandidateById(id);
	        if (existingCandidate != null) {
	            candidate.setId(id);
	            Candidate updatedCandidate = candidateService.saveCandidate(candidate);
	            return ResponseEntity.ok(updatedCandidate);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
}
