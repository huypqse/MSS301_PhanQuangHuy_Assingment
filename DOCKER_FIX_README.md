# Giải thích vấn đề Docker vs Dev Mode

## Vấn đề gặp phải
Khi chạy ở **dev mode** (local) thì API Gateway hoạt động bình thường, nhưng khi build **Docker** thì routes không được load.

## Nguyên nhân

### Spring Cloud Gateway Server WebFlux vs Spring Cloud Gateway

Project này sử dụng `spring-cloud-starter-gateway-server-webflux` thay vì `spring-cloud-starter-gateway` thông thường.

Gateway Server WebFlux có một số khác biệt:
1. **Property path khác**: Phải dùng `spring.cloud.gateway.server.webflux.*` thay vì `spring.cloud.gateway.*`
2. **Ưu tiên YAML hơn Properties**: YAML configuration được đọc tốt hơn properties file
3. **Không log routes**: Server WebFlux không log ra thông tin routes khi start như Gateway thường

## Giải pháp

### 1. Chuyển từ `.properties` sang `.yml`

**Trước đây (không hoạt động):**
```properties
spring.cloud.gateway.server.webflux.routes[0].id=account-service
spring.cloud.gateway.server.webflux.routes[0].uri=http://account-service:8081
spring.cloud.gateway.server.webflux.routes[0].predicates[0]=Path=/api/accounts/**
```

**Sau khi fix (hoạt động):**
```yaml
spring:
  cloud:
    gateway:
      server:
        webflux:
          routes:
            - id: account-service
              uri: http://account-service:8081
              predicates:
                - Path=/api/accounts/**
```

### 2. Cấu trúc file
- `application.yml` - Config chung và CORS
- `application-docker.yml` - Routes cho Docker (dùng service names)
- `application-dev.yml` - Routes cho dev mode (dùng localhost)

### 3. Profile trong Docker
Dockerfile phải set profile đúng:
```dockerfile
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]
```

## Kết quả
✅ Routes hoạt động trong Docker  
✅ API Gateway forward requests đến các microservices  
✅ CORS được cấu hình đúng  
✅ Frontend có thể gọi API qua Gateway  

## Test
```bash
# Test brand service
curl http://localhost:8080/api/brands

# Test blindbox service  
curl http://localhost:8080/api/blind-boxes

# Test account service
curl http://localhost:8080/api/accounts/login -X POST
```

