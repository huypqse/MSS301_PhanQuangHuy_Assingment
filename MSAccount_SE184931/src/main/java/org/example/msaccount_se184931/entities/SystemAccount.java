package org.example.msaccount_se184931.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "system_accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SystemAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private int role;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isActive = true;
}

