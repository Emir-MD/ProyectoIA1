import React, { useState, useEffect } from "react";

function App() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Obtener comentarios al cargar la página
  useEffect(() => {
    fetch("/api/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  // Agregar un comentario
  const addComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newComment = await response.json();
    setComments([...comments, newComment]);
    setText("");
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
        {comments.map((comment, index) => (
          <li key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
            <strong>Comentario:</strong> {comment.text} <br />
            <strong>Clasificación:</strong> {comment.classification}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
