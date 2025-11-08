package org.example.msblindbox_se184931.data;

import lombok.RequiredArgsConstructor;
import org.example.msblindbox_se184931.entities.BlindBoxCategory;
import org.example.msblindbox_se184931.repository.BlindBoxCategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final BlindBoxCategoryRepository blindboxCategoryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (blindboxCategoryRepository.count() == 0) {
            BlindBoxCategory fantasy = BlindBoxCategory.builder()
                    .name("Fantasy")
                    .description("Mystical creatures, wizards, and legendary beings")
                    .rarityLevel("Common to Ultra Rare")
                    .priceRange("$10 - $60")
                    .build();

            BlindBoxCategory gaming = BlindBoxCategory.builder()
                    .name("Gaming")
                    .description("Blind boxes featuring characters from popular video games")
                    .rarityLevel("Common to Epic")
                    .priceRange("$25 - $70")
                    .build();

            blindboxCategoryRepository.saveAll(Arrays.asList(fantasy, gaming));
        }
    }
}
