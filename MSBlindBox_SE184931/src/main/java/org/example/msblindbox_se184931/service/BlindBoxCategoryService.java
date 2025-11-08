package org.example.msblindbox_se184931.service;

import org.example.msblindbox_se184931.dto.BlindBoxCategoryRequest;
import org.example.msblindbox_se184931.entities.BlindBoxCategory;

import java.util.List;

public interface BlindBoxCategoryService {
    BlindBoxCategory create(BlindBoxCategoryRequest request);

    BlindBoxCategory update(Integer id, BlindBoxCategoryRequest request);

    void delete(Integer id);

    List<BlindBoxCategory> getAll();
}
