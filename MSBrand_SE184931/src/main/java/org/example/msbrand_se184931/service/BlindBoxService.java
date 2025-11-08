package org.example.msbrand_se184931.service;

import org.example.msbrand_se184931.dto.BlindBoxRequest;
import org.example.msbrand_se184931.entities.BlindBox;

public interface BlindBoxService {
    BlindBox create(BlindBoxRequest request);

    BlindBox update(Integer id, BlindBoxRequest request);

    void delete(Integer id);
}
