package org.example.apigateway_se184931.filters;

import lombok.RequiredArgsConstructor;
import org.example.apigateway_se184931.utils.FilterUtil;
import org.example.apigateway_se184931.utils.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {
    private static final Map<String, String> PUBLIC_ENDPOINTS = Map.of(
            "/api/accounts/login", "POST",
            "/api/blind-boxes", "GET",
            "/api/brands", "GET",
            "/api/blind-boxes/categories", "GET"
    );

    private final JwtUtil jwtUtil;
    private final FilterUtil filterUtil;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();

        if (isPublicEndpoint(path, method)) {
            exchange.getAttributes().put("skipFilters", true);
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return filterUtil.onError(exchange, "Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return filterUtil.onError(exchange, "Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        exchange.getAttributes().put("token", token);

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 0;
    }

    private boolean isPublicEndpoint(String endpoint, String method) {
        for (Map.Entry<String, String> entry : PUBLIC_ENDPOINTS.entrySet()) {
            String publicPath = entry.getKey();
            String publicMethod = entry.getValue();

            if (endpoint.startsWith(publicPath) && method.equalsIgnoreCase(publicMethod)) {
                return true;
            }
        }
        return false;
    }
}
