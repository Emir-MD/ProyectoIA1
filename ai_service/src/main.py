from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

# Definir el modelo que se usará
MODEL_NAME = "llama3"

@app.route('/classify', methods=['POST'])
def classify_comment():
    try:
        data = request.get_json()
        comment = data.get("comment", "")

        if not comment:
            return jsonify({"error": "No comment provided"}), 400

        # Generar la clasificación con Ollama
        response = ollama.chat(model=MODEL_NAME, messages=[
            {"role": "system", "content": "You are an AI that classifies user comments as 'positive', 'negative' or 'neutral'."},
            {"role": "user", "content": f"Classify the following comment: '{comment}'"}
        ])

        classification = response['message']['content'].strip().lower()
        
        return jsonify({"comment": comment, "classification": classification})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
