package com.example.demo.auth.jwt;

import java.util.Date;

import io.jsonwebtoken.*;

import com.example.demo.auth.payload.CustomUserDetails;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
    private final String JWT_SECRET = "secretkey";
    private final Long JWT_EXPIRATION = 60000L;

    public String generateToken(CustomUserDetails userDetails) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                .setSubject((userDetails.getUser().getUsername()).toString())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUserNameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty.");
        }
        return false;
    }
}
