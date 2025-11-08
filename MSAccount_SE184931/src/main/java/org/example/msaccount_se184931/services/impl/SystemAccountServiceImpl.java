package org.example.msaccount_se184931.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.msaccount_se184931.dto.LoginRequest;
import org.example.msaccount_se184931.dto.LoginResponse;
import org.example.msaccount_se184931.entities.SystemAccount;
import org.example.msaccount_se184931.repository.SystemAccountRepository;
import org.example.msaccount_se184931.services.SystemAccountService;
import org.example.msaccount_se184931.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class SystemAccountServiceImpl implements SystemAccountService {
    private final SystemAccountRepository systemAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest request) {
        SystemAccount account = systemAccountRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid username or password"
                ));

        if (!account.getIsActive()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Account is not active"
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid username or password"
            );
        }

        return LoginResponse.builder()
                .token(jwtUtil.generateToken(account))
                .build();
    }
}
