package com.example.hrPortal.hrms.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.hrPortal.hrms.model.HR;
import com.example.hrPortal.hrms.repository.HRRepository;

@Service
public class HrService {
	
	@Autowired
	private HRRepository hrRepository;
	
	public List<HR> getAllHRs(){
		return hrRepository.findAll();
	}
	
	public HR getHRById(Long id) {
		return hrRepository.findById(id).orElse(null) ;
	}
	
	public HR createHR(HR hr) {
		return hrRepository.save(hr);
	}
	
	public HR updateHR(Long id,HR hrDetails) {
		HR hr=hrRepository.findById(id).orElse(null);
		if(hr!=null) {
			hr.setName(hrDetails.getName());
			hr.setEmail(hrDetails.getEmail());
			return hrRepository.save(hr);
		}
		return null;
	}
	
	public void deleteHR(Long id) {
		hrRepository.deleteById(id);
	}

}
