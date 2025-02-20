import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api"; // Ruta base para el backend

function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Obtener comentarios al cargar la página con manejo de errores
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE}/comments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid JSON format received from server");
        }

        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        alert("Error al obtener comentarios. Revisa la consola para más detalles.");
      }
    };

    fetchComments();
  }, []);

  // Agregar un comentario con manejo de errores
  const addComment = async () => {
    if (!text.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/classify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: text }), // Se usa "comment" porque el backend espera esa clave
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newComment = await response.json();

      setComments([...comments, newComment]);
      setText("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Error al enviar el comentario. Revisa la consola.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
      <h1>Clasificador de Comentarios</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
      />
      <button onClick={addComment}>Enviar</button>

      <h2>Comentarios Clasificados</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              <strong>Comentario:</strong> {comment.text} <br />
              <strong>Clasificación:</strong> {comment.classification || "Sin clasificación"}
            </li>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
