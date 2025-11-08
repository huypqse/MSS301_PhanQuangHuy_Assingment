package org.example.msbrand_se184931.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "blind_boxes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlindBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int categoryId;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    private String rarity;

    private double price;

    private LocalDate releaseDate;

    private int stock;
}

