package org.example.msblindbox_se184931.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.msblindbox_se184931.dto.BlindBoxCategoryRequest;
import org.example.msblindbox_se184931.entities.BlindBoxCategory;
import org.example.msblindbox_se184931.repository.BlindBoxCategoryRepository;
import org.example.msblindbox_se184931.service.BlindBoxCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlindBoxCategoryServiceImpl implements BlindBoxCategoryService {
    private final BlindBoxCategoryRepository blindBoxCategoryRepository;

    @Override
    @Transactional
    public BlindBoxCategory create(BlindBoxCategoryRequest request) {
        BlindBoxCategory category = BlindBoxCategory.builder()
                .name(request.getName())
                .description(request.getDescription())
                .rarityLevel(request.getRarityLevel())
                .priceRange(request.getPriceRange())
                .build();

        return blindBoxCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public BlindBoxCategory update(Integer id, BlindBoxCategoryRequest request) {
        BlindBoxCategory category = blindBoxCategoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blind Box Category not found with id: " + id
                ));

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setRarityLevel(request.getRarityLevel());
        category.setPriceRange(request.getPriceRange());

        return blindBoxCategoryRepository.save(category);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        BlindBoxCategory category = blindBoxCategoryRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blind Box Category not found with id: " + id
                ));

        blindBoxCategoryRepository.delete(category);
    }

    @Override
    public List<BlindBoxCategory> getAll() {
        return blindBoxCategoryRepository.findAll();
    }
}
