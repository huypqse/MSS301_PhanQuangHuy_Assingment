package org.example.msblindbox_se184931.controller;

import lombok.RequiredArgsConstructor;
import org.example.msblindbox_se184931.dto.BlindBoxCategoryRequest;
import org.example.msblindbox_se184931.entities.BlindBoxCategory;
import org.example.msblindbox_se184931.service.BlindBoxCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blind-boxes/categories")
@RequiredArgsConstructor
public class BlindBoxCategoryController {
    private final BlindBoxCategoryService blindBoxCategoryService;

    @PostMapping
    public ResponseEntity<BlindBoxCategory> create(@RequestBody BlindBoxCategoryRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(blindBoxCategoryService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlindBoxCategory> update(@PathVariable Integer id, @RequestBody BlindBoxCategoryRequest request) {
        return ResponseEntity.ok(blindBoxCategoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        blindBoxCategoryService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<BlindBoxCategory>> getAll() {
        return ResponseEntity.ok(blindBoxCategoryService.getAll());
    }
}