from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import librosa
from transformers import pipeline

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Text model
text_model = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    framework="pt"
)

def get_text_emotion(text):
    if not text.strip():
        return None
    result = text_model(text)
    return result[0]['label']

def get_audio_emotion(file_path):
    y, sr = librosa.load(file_path, sr=16000)
    try:
        pitch = librosa.yin(y, fmin=50, fmax=300).mean()
    except:
        pitch = 0
    energy = (y**2).mean()
    if pitch > 180 and energy > 0.01:
        return "happy"
    elif pitch < 100 and energy < 0.005:
        return "sad"
    else:
        return "neutral"

# Endpoint
@app.post("/detect_emotion/")
async def detect_emotion(
    text: str = Form(None),
    audio: UploadFile = File(None)
):
    text_emotion = get_text_emotion(text) if text else None
    audio_emotion = None
    if audio:
        with open("temp_audio.wav", "wb") as f:
            f.write(await audio.read())
        audio_emotion = get_audio_emotion("temp_audio.wav")
    
    # Map emotion to emoji
    emoji_dict = {
        "happy": "emoji_happy.png",
        "sad": "emoji_sad.png",
        "neutral": "emoji_neutral.png",
        "angry": "emoji_angry.png"
    }

    # You can choose which emoji to show for combined display; here using text if available
    final_emoji = emoji_dict.get(text_emotion or audio_emotion)

    return {
        "text_emotion": text_emotion,
        "audio_emotion": audio_emotion,
        "emoji": final_emoji
    }
