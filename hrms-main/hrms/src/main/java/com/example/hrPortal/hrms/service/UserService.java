//package com.example.hrPortal.hrms.service;
//
//import java.util.HashSet;
//import java.util.Set;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import com.example.hrPortal.hrms.model.Role;
//import com.example.hrPortal.hrms.model.User;
//import com.example.hrPortal.hrms.repository.RoleRepository;
//import com.example.hrPortal.hrms.repository.UserRepository;
//
//import jakarta.transaction.Transactional;
//
//@Service
//public class UserService {
//
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public void createAdminUser() {
//        Role adminRole = roleRepository.findByName("ROLE_SENIOR_HR");
//        Role hrRole = roleRepository.findByName("ROLE_HR");
//
//        if (adminRole == null) {
//            adminRole = new Role();
//            adminRole.setName("ROLE_SENIOR_HR");
//            roleRepository.save(adminRole);
//        }
//
//        if (hrRole == null) {
//            hrRole = new Role();
//            hrRole.setName("ROLE_HR");
//            roleRepository.save(hrRole);
//        }
//
//        // Create a senior HR user
//        User seniorHrUser = new User();
//        seniorHrUser.setUsername("senior_hr");
//        seniorHrUser.setPassword(passwordEncoder.encode("admin_password"));
//        seniorHrUser.setRoles(new HashSet<>(Set.of(adminRole)));
//        userRepository.save(seniorHrUser);
//
//        // Create a HR user
//        User hrUser = new User();
//        hrUser.setUsername("hr_user");
//        hrUser.setPassword(passwordEncoder.encode("hr_password"));
//        hrUser.setRoles(new HashSet<>(Set.of(hrRole)));
//        userRepository.save(hrUser);
//}
//}
