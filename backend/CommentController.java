package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.MongoTemplate;

@RestController
@RequestMapping("/api/comments") // Prefijo para todas las rutas del controlador
public class CommentController {

    @Autowired
    private MongoTemplate mongoTemplate; // Para interactuar con MongoDB

    // Endpoint para clasificar comentarios
    @PostMapping("/classify")
    public Comment classifyComment(@RequestBody Comment comment) {
        // Simulación de clasificación de IA
        String classification = classifyUsingAI(comment.getText());
        comment.setClassification(classification);

        // Guardar en MongoDB
        mongoTemplate.save(comment);

        return comment; // Devuelve el comentario clasificado
    }

    // Simulación de un modelo de IA
    private String classifyUsingAI(String text) {
        if (text.toLowerCase().contains("bueno") || text.toLowerCase().contains("excelente")) {
            return "positivo";
        } else if (text.toLowerCase().contains("malo") || text.toLowerCase().contains("terrible")) {
            return "negativo";
        } else {
            return "neutro";
        }
    }
}