package org.example.msblindbox_se184931;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsBlindBoxSe184931Application {

    public static void main(String[] args) {
        SpringApplication.run(MsBlindBoxSe184931Application.class, args);
    }

}
