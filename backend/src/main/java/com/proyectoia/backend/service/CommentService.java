package com.proyectoia.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CommentService {
    public String classifyComment(String text) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForObject("http://ai_service:8000/classify", text, String.class);
    }
}
