package org.example.msaccount_se184931.data;

import lombok.RequiredArgsConstructor;
import org.example.msaccount_se184931.entities.SystemAccount;
import org.example.msaccount_se184931.repository.SystemAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final SystemAccountRepository systemAccountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (systemAccountRepository.count() == 0) {
            SystemAccount user = SystemAccount.builder()
                    .email("user@gmail.com")
                    .role(4)
                    .username("user")
                    .password(passwordEncoder.encode("12345"))
                    .build();

            SystemAccount admin = SystemAccount.builder()
                    .email("admin@gmail.com")
                    .role(1)
                    .username("admin")
                    .password(passwordEncoder.encode("12345"))
                    .build();

            systemAccountRepository.saveAll(Arrays.asList(user, admin));
        }
    }
}