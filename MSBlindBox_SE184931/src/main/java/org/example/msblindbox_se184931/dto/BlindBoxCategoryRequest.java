package org.example.msblindbox_se184931.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlindBoxCategoryRequest {
    private String name;
    private String description;
    private String rarityLevel;
    private String priceRange;
}
