from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# Obtain Ollama's URL from environment variable or use default
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://ollama:11434")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"message": "AI Service is running"}), 200

@app.route("/classify", methods=["POST"])
def classify_comment():
    try:
        data = request.get_json()
        if not data or "comment" not in data:
            return jsonify({"error": "No comment provided"}), 400

        comment = data["comment"]
        
        # Ensure streaming is disabled to get a full response
        response = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={"model": "llama3", "prompt": comment, "stream": False},
            timeout=10
        )

        # Ensure response is valid JSON
        try:
            json_response = response.json()
        except requests.exceptions.JSONDecodeError as e:
            return jsonify({"error": f"Invalid JSON response from Ollama: {str(e)}"}), 500
        
        return jsonify(json_response), 200

    except requests.exceptions.Timeout:
        return jsonify({"error": "Request to Ollama timed out"}), 500
    except requests.exceptions.ConnectionError:
        return jsonify({"error": "Could not connect to Ollama"}), 500
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    print(f"Starting Flask server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
