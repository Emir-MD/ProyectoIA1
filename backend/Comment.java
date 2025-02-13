package backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments") // Define la colección en MongoDB
public class Comment {

    @Id // Identificador único generado automáticamente por MongoDB
    private String id;

    private String text; // El texto del comentario
    private String classification; // Clasificación (positivo, negativo, neutro)

    // Constructor
    public Comment(String text, String classification) {
        this.text = text;
        this.classification = classification;
    }

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }
}