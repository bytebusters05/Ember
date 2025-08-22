import os
import google.generativeai as genai
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# --- Flask app setup ---
app = Flask(__name__)
CORS(app)

# Configure the Gemini API with your key from the .env file
try:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("GEMINI_API_KEY not found in .env file.")
    genai.configure(api_key=gemini_api_key)
except ValueError as e:
    print(f"Error configuring Gemini API: {e}")
    exit()

# System prompt to define the bot's persona
system_prompt = "You are a thoughtful and empathetic AI named MindfulBot, a mental health companion..." # (rest of the prompt)

# Crisis detection
CRISIS_KEYWORDS = ['suicide', 'kill myself', 'end it all', 'want to die', 'hurt myself']
CRISIS_RESPONSE = {
    'content': "I'm really concerned about what you've shared...",
    'emotion': 'crisis',
    'quickActions': []
}

@app.route('/api/gemini-chat', methods=['POST'])
def gemini_chat():
    data = request.json
    user_message = data.get('message', '')
    history = data.get('history', [])

    if any(keyword in user_message.lower() for keyword in CRISIS_KEYWORDS):
        return jsonify(CRISIS_RESPONSE)

    gemini_history = []
    for msg in history:
        if msg.get('sender') == 'user':
            gemini_history.append({"role": "user", "parts": [msg.get('content')]})
        elif msg.get('sender') == 'bot':
            gemini_history.append({"role": "model", "parts": [msg.get('content')]})

    try:
        model = genai.GenerativeModel('gemini-1.5-flash', system_instruction=system_prompt)
        chat = model.start_chat(history=gemini_history)
        response = chat.send_message(user_message)
        gemini_text = response.text
        
        return jsonify({
            'content': gemini_text,
            'emotion': 'supportive',
            'quickActions': []
        })
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)