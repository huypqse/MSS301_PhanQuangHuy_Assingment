package org.example.msblindbox_se184931.service.impl;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.example.msblindbox_se184931.clients.BrandClient;
import org.example.msblindbox_se184931.dto.BlindBoxRequest;
import org.example.msblindbox_se184931.dto.Brand;
import org.example.msblindbox_se184931.entities.BlindBox;
import org.example.msblindbox_se184931.entities.BlindBoxCategory;
import org.example.msblindbox_se184931.repository.BlindBoxCategoryRepository;
import org.example.msblindbox_se184931.repository.BlindBoxRepository;
import org.example.msblindbox_se184931.service.BlindBoxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlindBoxServiceImpl implements BlindBoxService {
    private final BlindBoxRepository blindBoxRepository;
    private final BlindBoxCategoryRepository blindboxCategoryRepository;
    private final BrandClient brandClient;

    @Override
    @Transactional
    public BlindBox create(BlindBoxRequest request) {
        try {
            BlindBoxCategory category = blindboxCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Category not found with id: " + request.getCategoryId()
                    ));

            Brand brand = brandClient.getBrandById(request.getBrandId());

            brandClient.createBlindBox(request);

            BlindBox blindBox = BlindBox.builder()
                    .name(request.getName())
                    .category(category)
                    .brandId(brand.getId())
                    .rarity(request.getRarity())
                    .price(request.getPrice())
                    .releaseDate(LocalDate.now())
                    .stock(request.getStock())
                    .build();

            return blindBoxRepository.save(blindBox);
        } catch (FeignException ignored) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Brand not found with id: " + request.getBrandId()
            );
        }
    }

    @Override
    @Transactional
    public BlindBox update(Integer id, BlindBoxRequest request) {
        try {
            BlindBox blindBox = blindBoxRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Blind box not found with id: " + id
                    ));

            BlindBoxCategory category = blindboxCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Category not found with id: " + request.getCategoryId()
                    ));

            Brand brand = brandClient.getBrandById(request.getBrandId());

            blindBox.setName(request.getName());
            blindBox.setCategory(category);
            blindBox.setBrandId(brand.getId());
            blindBox.setRarity(request.getRarity());
            blindBox.setPrice(request.getPrice());
            blindBox.setStock(request.getStock());

            brandClient.updateBlindBox(id, request);

            return blindBoxRepository.save(blindBox);
        } catch (FeignException ignored) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Brand not found with id: " + request.getBrandId()
            );
        }
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        try {
            BlindBox blindBox = blindBoxRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Blind box not found with id: " + id
                    ));

            brandClient.deleteBlindBox(id);

            blindBoxRepository.delete(blindBox);
        } catch (FeignException ignored) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Blind box not found with id: " + id
            );
        }
    }

    @Override
    public List<BlindBox> getAll() {
        return blindBoxRepository.findAll();
    }
}
