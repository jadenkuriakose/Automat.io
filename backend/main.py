import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_executor import Executor
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)
executor = Executor(app)

def generate_email_message(prompt):
    api_key = os.getenv("KEY1")  
    if not api_key:
        return "API key not found.", 500

    client = Groq(api_key=api_key)
    
    try:
        response = client.chat.completions.create(
            model="llama3-8b-8192", 
            messages=[
                {
                    "role": "user",
                    "content": f"Write a professional email based on the prompt: {prompt}"
                }
            ],
            temperature=0.7, 
            max_tokens=500,  
            top_p=1,
            stream=True, 
        )

        msg = ""
        for chunk in response:
            msg += chunk.choices[0].delta.content or ""
        
        return msg.strip(), 200

    except Exception as e:
        return f"An error occurred: {str(e)}", 500


@app.route("/generate-email", methods=["POST"])
def generate_email():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()

    if not prompt:
        return jsonify({"error": "No prompt provided."}), 400

    future = executor.submit(generate_email_message, prompt)
    email_message, status_code = future.result()  

    if status_code == 200:
        return jsonify({"email_message": email_message})
    else:
        return jsonify({"error": email_message}), status_code

if __name__ == "__main__":
    app.run(debug=True, port=8080)
