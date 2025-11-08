package org.example.msbrand_se184931.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlindBoxRequest {
    private String name;
    private int categoryId;
    private int brandId;
    private String rarity;
    private double price;
    private int stock;
}