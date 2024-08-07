package com.example.hrPortal.hrms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrPortal.hrms.model.Candidate;
import com.example.hrPortal.hrms.repository.CandidateRepository;

@Service
public class CandidateService  {
	 @Autowired
	 private CandidateRepository candidateRepository;
	 
	 public List<Candidate> getAllCandidates() {
	        return candidateRepository.findAll();
	    }

	    public Candidate saveCandidate(Candidate candidate) {
	        return candidateRepository.save(candidate);
	    }
	    
	    public void deleteCandidate(Long id) {
	        if (candidateRepository.existsById(id)) {
	            candidateRepository.deleteById(id);
	        } else {
	            throw new RuntimeException("Candidate not found");
	        }
	    }
	 
	 
}
