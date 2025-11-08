package org.example.msbrand_se184931.service;

import org.example.msbrand_se184931.dto.BrandRequest;
import org.example.msbrand_se184931.entities.Brand;

import java.util.List;

public interface BrandService {
    Brand create(BrandRequest request);

    Brand update(Integer id, BrandRequest request);

    void delete(Integer id);

    Brand getById(Integer id);

    List<Brand> getAll();
}
