package com.codream.camperblic.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret-key}")
    private String secretKey;

    // 사용자 ID와 이름을 기반으로 JWT 토큰을 생성하는 메서드
    public String generateToken(String userid, String name) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (2 * 60 * 60 * 1000) + (30 * 60 * 1000)); // 토큰 만료 시간 설정 (2시간 30분)

        return Jwts.builder()
                .setSubject(userid)
                .claim("name", name)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 주어진 JWT 토큰에서 사용자 ID를 추출하는 메서드
    public String getUseridFromToken(String token) {
        Claims claims = Jwts.parserBuilder()  // JWT 파서를 생성합니다.
                .setSigningKey(secretKey)  // 비밀 키를 설정합니다.
                .build()  // JWT 파서를 빌드합니다.
                .parseClaimsJws(token)  // 주어진 토큰을 파싱하여 JWS(서명된 JWT) 객체를 얻습니다.
                .getBody();  // JWS 객체에서 페이로드(클레임)를 추출합니다.

        return claims.getSubject();  // 클레임에서 사용자 ID를 가져와 반환합니다.
    }

    // 주어진 JWT 토큰의 유효성을 검사하는 메서드
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()  // JWT 파서를 생성합니다.
                    .setSigningKey(secretKey)  // 비밀 키를 설정합니다.
                    .build()  // JWT 파서를 빌드합니다.
                    .parseClaimsJws(token);  // 주어진 토큰을 파싱하여 JWS(서명된 JWT) 객체를 얻습니다.
            Date expirationDate = claimsJws.getBody().getExpiration();  // 토큰의 만료일을 가져옵니다.

            return !expirationDate.before(new Date());  // 토큰의 만료일이 현재 시간 이전인지 확인하여 유효성을 판단합니다.
        } catch (Exception e) {
            return false;  // 예외가 발생하면 유효하지 않은 토큰으로 간주합니다.
        }
    }

    // 주어진 만료된 JWT 토큰을 기반으로 새로운 토큰을 발급하는 메서드
    public String refreshToken(String expiredToken) {
        if (!validateToken(expiredToken)) {
            throw new IllegalArgumentException("유효하지 않은 토큰입니다.");
        }

        Claims claims = Jwts.parserBuilder()  // JWT 파서를 생성합니다.
                .setSigningKey(secretKey)  // 비밀 키를 설정합니다.
                .build()  // JWT 파서를 빌드합니다.
                .parseClaimsJws(expiredToken)  // 주어진 만료된 토큰을 파싱하여 JWS(서명된 JWT) 객체를 얻습니다.
                .getBody();  // JWS 객체에서 클레임 정보를 얻습니다.

        String userid = claims.getSubject();  // 사용자 ID를 추출합니다.
        String name = claims.get("name", String.class);  // 이름을 추출합니다.

        return generateToken(userid, name);  // 새로운 토큰을 생성하여 반환합니다.
    }
}