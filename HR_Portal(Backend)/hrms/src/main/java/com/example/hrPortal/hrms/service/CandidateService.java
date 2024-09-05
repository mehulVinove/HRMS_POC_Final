package com.example.hrPortal.hrms.service;

import java.util.List;
import java.util.Optional;

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

	    
	    public boolean deleteCandidate(Long id) {
//	        if (candidateRepository.existsById(id)) {
//	            candidateRepository.deleteById(id);
//	        } else {
//	            throw new RuntimeException("Candidate not found");
//	        }
	    	 if (candidateRepository.existsById(id)) {
	    	        candidateRepository.deleteById(id);
	    	        return true;
	    	    } else {
	    	        return false;
	    	    }
	    
	    }
	    public Candidate getCandidateById(Long id) {
	        Optional<Candidate> candidate = candidateRepository.findById(id);
	        return candidate.orElse(null); // or throw an exception if not found
	    }
	    
//	    public Candidate updateCandidate(Candidate candidate) {
//	        if (candidateRepository.existsById(candidate.getId())) {
//	            return candidateRepository.save(candidate);
//	        } else {
//	            throw new RuntimeException("Candidate not found");
//	        }
//	    }
	 
	    public Candidate updateCandidate(Long id, Candidate candidateDetails) {
	        Optional<Candidate> candidateOptional = candidateRepository.findById(id);

	        if (!candidateOptional.isPresent()) {
	            throw new RuntimeException("Candidate not found");
	        }

	        Candidate candidate = candidateOptional.get();
	        
	        // Update candidate fields from the provided candidateDetails
	        candidate.setName(candidateDetails.getName());
	        candidate.setPosition(candidateDetails.getPosition());
	        candidate.setStatus(candidateDetails.getStatus());
	        candidate.setInterview1Status(candidateDetails.getInterview1Status());
	        candidate.setInterview2Status(candidateDetails.getInterview2Status());

	        // Save the updated candidate to the database
	        return candidateRepository.save(candidate);
	    }
	 
}
