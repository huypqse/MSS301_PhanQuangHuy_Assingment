package org.example.msbrand_se184931.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.msbrand_se184931.dto.BrandRequest;
import org.example.msbrand_se184931.entities.Brand;
import org.example.msbrand_se184931.repository.BrandRepository;
import org.example.msbrand_se184931.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Override
    @Transactional
    public Brand create(BrandRequest request) {
        Brand brand = Brand.builder()
                .name(request.getName())
                .countryOfOrigin(request.getCountryOfOrigin())
                .build();

        return brandRepository.save(brand);
    }

    @Override
    @Transactional
    public Brand update(Integer id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found with id: " + id
                ));

        brand.setName(request.getName());
        brand.setCountryOfOrigin(request.getCountryOfOrigin());

        return brandRepository.save(brand);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found with id: " + id
                ));

        brandRepository.delete(brand);
    }

    @Override
    public Brand getById(Integer id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Brand not found with id: " + id
                ));
    }

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }
}

