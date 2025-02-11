package com.proyectoia.backend.controller;

import com.proyectoia.backend.model.Comment;
import com.proyectoia.backend.repository.CommentRepository;
import com.proyectoia.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        comment.setClassification(commentService.classifyComment(comment.getText()));
        return commentRepository.save(comment);
    }

    @GetMapping
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }
}
