package org.example.msbrand_se184931.controller;

import lombok.RequiredArgsConstructor;
import org.example.msbrand_se184931.dto.BlindBoxRequest;
import org.example.msbrand_se184931.entities.BlindBox;
import org.example.msbrand_se184931.service.BlindBoxService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blind-boxes")
@RequiredArgsConstructor
public class BlindBoxController {
    private final BlindBoxService blindBoxService;

    @PostMapping
    public ResponseEntity<BlindBox> create(@RequestBody BlindBoxRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(blindBoxService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlindBox> update(@PathVariable Integer id, @RequestBody BlindBoxRequest request) {
        return ResponseEntity.ok(blindBoxService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        blindBoxService.delete(id);

        return ResponseEntity.noContent().build();
    }
}