package org.example.msblindbox_se184931.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "blind_box_categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlindBoxCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String rarityLevel;

    private String priceRange;
}
