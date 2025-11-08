package org.example.msblindbox_se184931.service;



import org.example.msblindbox_se184931.dto.BlindBoxRequest;
import org.example.msblindbox_se184931.entities.BlindBox;

import java.util.List;

public interface BlindBoxService {
    BlindBox create(BlindBoxRequest request);

    BlindBox update(Integer id, BlindBoxRequest request);

    void delete(Integer id);

    List<BlindBox> getAll();
}
