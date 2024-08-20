package com.example.hrPortal.hrms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hrPortal.hrms.model.HR;
import com.example.hrPortal.hrms.service.HrService;
import java.util.List;

@RestController
@RequestMapping("/api/hr")
public class HrController {

	@Autowired
	private HrService hrService;
	
    @GetMapping
    public List<HR> getAllHRs() {
        return hrService.getAllHRs();
    }

    @GetMapping("/{id}")
    public HR getHRById(@PathVariable Long id) {
        return hrService.getHRById(id);
    }

    @PostMapping
    public HR createHR(@RequestBody HR hr) {
        return hrService.createHR(hr);
    }

    @PutMapping("/{id}")
    public HR updateHR(@PathVariable Long id, @RequestBody HR hrDetails) {
        return hrService.updateHR(id, hrDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteHR(@PathVariable Long id) {
        hrService.deleteHR(id);
	
    }
	
}
