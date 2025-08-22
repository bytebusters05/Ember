// EmotionDetector.jsx
import React, { useState } from "react";
import "./Audio.css";

const emojiMap = {
  happy: "😊",
  sad: "😢",
  neutral: "😐",
  angry: "😠",
};

export default function EmotionDetector() {
  const [textInput, setTextInput] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ text_emotion: "", audio_emotion: "" });
  const [emoji, setEmoji] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textInput && !audioFile) {
      alert("Please enter text or select an audio file.");
      return;
    }

    const formData = new FormData();
    if (textInput) formData.append("text", textInput);
    if (audioFile) formData.append("audio", audioFile);

    setLoading(true);
    setResult({ text_emotion: "", audio_emotion: "" });
    setEmoji("");

    try {
      const res = await fetch("http://127.0.0.1:8000/detect_emotion/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      const data = await res.json();
      setResult(data);

      const key = data.text_emotion || data.audio_emotion;
      setEmoji(emojiMap[key] || "");
    } catch (err) {
      console.error(err);
      setResult({ text_emotion: "Error", audio_emotion: "Error" });
      setEmoji("❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🎭 Emotion Detector</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter text..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Detecting..." : "Detect Emotions"}
        </button>
      </form>
      <div className="result">
        Text Emotion: {result.text_emotion || "N/A"} | Audio Emotion:{" "}
        {result.audio_emotion || "N/A"}
      </div>
      <div className="emoji">{emoji}</div>
    </div>
  );
}
