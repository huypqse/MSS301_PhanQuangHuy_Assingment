package org.example.msaccount_se184931.controller;

import lombok.RequiredArgsConstructor;
import org.example.msaccount_se184931.dto.LoginRequest;
import org.example.msaccount_se184931.dto.LoginResponse;
import org.example.msaccount_se184931.services.SystemAccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accounts")
public class SystemAccountController {
    private final SystemAccountService systemAccountService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = systemAccountService.login(loginRequest);

        return ResponseEntity.ok(loginResponse);
    }
}
