package org.example.msbrand_se184931.controller;

import lombok.RequiredArgsConstructor;
import org.example.msbrand_se184931.dto.BrandRequest;
import org.example.msbrand_se184931.entities.Brand;
import org.example.msbrand_se184931.service.BrandService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;

    @GetMapping("/{id}")
    public ResponseEntity<Brand> getById(@PathVariable int id) {
        return ResponseEntity.ok(brandService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Brand> create(@RequestBody BrandRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(brandService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> update(@PathVariable int id, @RequestBody BrandRequest request) {
        return ResponseEntity.ok(brandService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        brandService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Brand>> getAll() {
        return ResponseEntity.ok(brandService.getAll());
    }
}
