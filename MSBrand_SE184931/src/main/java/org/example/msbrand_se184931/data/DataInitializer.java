package org.example.msbrand_se184931.data;

import lombok.RequiredArgsConstructor;
import org.example.msbrand_se184931.entities.Brand;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final org.example.msbrand_se184931.repository.BrandRepository brandRepository;

    @Override
    public void run(String... args) {
        if (brandRepository.count() == 0) {
            Brand funko = Brand.builder()
                    .name("Funko")
                    .countryOfOrigin("USA")
                    .build();

            Brand kidrobot = Brand.builder()
                    .name("Kidrobot")
                    .countryOfOrigin("China")
                    .build();

            brandRepository.saveAll(Arrays.asList(funko, kidrobot));
        }
    }
}
