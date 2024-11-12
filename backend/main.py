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


def grade(tone, prompt):
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
                    "content": f"Grade this email message from 1-100 on grammar and accuracy in regards to {tone}: {prompt} and only provide one single number, never provide anything that is not just a number between 1-100"
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

def feed(tone, prompt):
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
                    "content": f"Write feedback on how to improve the message's grammar and accuracy in regards to how well it fits the tone of {tone}: {prompt} and make it simple to an extent with no weird formatting"
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


@app.route("/grade-email", methods=["POST"])
def grade_email():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    tone = data.get("tone", "").strip()

    if not prompt or not tone:
        return jsonify({"error": "Both prompt and tone are required."}), 400

    future = executor.submit(grade, tone, prompt)
    grade_message, status_code = future.result()  

    if status_code == 200:
        return jsonify({"grade_message": grade_message})
    else:
        return jsonify({"error": grade_message}), status_code
    
@app.route("/feedback", methods=["POST"])
def feedback():
    data = request.get_json()
    prompt = data.get("prompt", "").strip()
    tone = data.get("tone", "").strip()

    if not prompt or not tone:
        return jsonify({"error": "Both prompt and tone are required."}), 400

    future = executor.submit(feed, tone, prompt)
    message, status_code = future.result()  

    if status_code == 200:
        return jsonify({"feedback": message})
    else:
        return jsonify({"error": message}), status_code


if __name__ == "__main__":
    app.run(debug=True, port=8080)
