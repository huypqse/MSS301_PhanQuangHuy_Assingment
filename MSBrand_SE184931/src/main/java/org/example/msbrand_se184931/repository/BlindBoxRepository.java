package org.example.msbrand_se184931.repository;

import org.example.msbrand_se184931.entities.BlindBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlindBoxRepository extends JpaRepository<BlindBox, Integer> {
}

