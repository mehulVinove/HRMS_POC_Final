package com.example.hrPortal.hrms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Candidate {
		
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    	private Long id;

	    private String name;
	    private String position;
	    private String status;
	    
	    private String interview1Status;
	    private String interview2Status;
	    
		public String getInterview1Status() {
			return interview1Status;
		}
		public void setInterview1Status(String interview1Status) {
			this.interview1Status = interview1Status;
		}
		public String getInterview2Status() {
			return interview2Status;
		}
		public void setInterview2Status(String interview2Status) {
			this.interview2Status = interview2Status;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPosition() {
			return position;
		}
		public void setPosition(String position) {
			this.position = position;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}

}
