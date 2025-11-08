package org.example.msaccount_se184931.services;

import org.example.msaccount_se184931.dto.LoginRequest;
import org.example.msaccount_se184931.dto.LoginResponse;

public interface SystemAccountService {
    LoginResponse login(LoginRequest request);
}

