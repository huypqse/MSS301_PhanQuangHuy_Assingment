package org.example.msblindbox_se184931.repository;

import org.example.msblindbox_se184931.entities.BlindBoxCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlindBoxCategoryRepository extends JpaRepository<BlindBoxCategory, Integer> {
}
