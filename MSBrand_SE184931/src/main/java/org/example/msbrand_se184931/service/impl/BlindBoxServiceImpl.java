package org.example.msbrand_se184931.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.msbrand_se184931.dto.BlindBoxRequest;
import org.example.msbrand_se184931.entities.BlindBox;
import org.example.msbrand_se184931.entities.Brand;
import org.example.msbrand_se184931.repository.BlindBoxRepository;
import org.example.msbrand_se184931.repository.BrandRepository;
import org.example.msbrand_se184931.service.BlindBoxService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BlindBoxServiceImpl implements BlindBoxService {
    private final BlindBoxRepository blindBoxRepository;
    private final BrandRepository brandRepository;

    @Override
    @Transactional
    public BlindBox create(BlindBoxRequest request) {
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found with id: " + request.getBrandId()
                ));

        BlindBox blindBox = BlindBox.builder()
                .name(request.getName())
                .categoryId(request.getCategoryId())
                .brand(brand)
                .rarity(request.getRarity())
                .price(request.getPrice())
                .releaseDate(LocalDate.now())
                .stock(request.getStock())
                .build();

        return blindBoxRepository.save(blindBox);
    }

    @Override
    @Transactional
    public BlindBox update(Integer id, BlindBoxRequest request) {
        BlindBox blindBox = blindBoxRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blind box not found with id: " + id
                ));

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found with id: " + request.getBrandId()
                ));

        blindBox.setName(request.getName());
        blindBox.setCategoryId(request.getCategoryId());
        blindBox.setBrand(brand);
        blindBox.setRarity(request.getRarity());
        blindBox.setPrice(request.getPrice());
        blindBox.setReleaseDate(LocalDate.now());
        blindBox.setStock(request.getStock());

        return blindBoxRepository.save(blindBox);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        BlindBox blindBox = blindBoxRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Blind box not found with id: " + id
                ));

        blindBoxRepository.delete(blindBox);
    }
}