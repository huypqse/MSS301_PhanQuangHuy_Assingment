package org.example.msblindbox_se184931.clients;

import org.example.msblindbox_se184931.dto.BlindBoxRequest;
import org.example.msblindbox_se184931.dto.Brand;
import org.example.msblindbox_se184931.entities.BlindBox;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "brand-service", url = "${brand-service.url}")
public interface BrandClient {
    @GetMapping("/brands/{id}")
    Brand getBrandById(@PathVariable("id") Integer id);

    @PostMapping("/blind-boxes")
    BlindBox createBlindBox(@RequestBody BlindBoxRequest request);

    @PutMapping("/blind-boxes/{id}")
    BlindBox updateBlindBox(@PathVariable Integer id, @RequestBody BlindBoxRequest request);

    @DeleteMapping("/blind-boxes/{id}")
    void deleteBlindBox(@PathVariable Integer id);
}