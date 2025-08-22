import React, { useState, useEffect, useRef } from 'react';

// Helper to load external scripts
const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

// Helper to load external stylesheets
const useStylesheet = (url) => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [url]);
};


// --- Child Components ---

const Message = ({ message }) => {
  const { text, isUser, isCrisis } = message;
  const wrapperClasses = `flex max-w-[80%] opacity-0 transform-gpu animate-fadeInUp ${isUser ? 'self-end' : 'self-start'}`;
  const messageClasses = `message py-3 px-5 rounded-2xl leading-relaxed ${
    isUser 
      ? 'bg-indigo-500 text-white rounded-br-lg' 
      : 'bg-gray-100 text-gray-800 rounded-bl-lg'
  } ${isCrisis ? 'bg-red-50 border border-red-300 text-red-700' : ''}`;

  return (
    <div className={wrapperClasses}>
      <div 
        className={messageClasses} 
        dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}
      />
    </div>
  );
};

const CameraView = ({ onClose, onEmotionDetected }) => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState('Initializing camera...');
  const faceApiInterval = useRef(null);

  useEffect(() => {
    const loadModelsAndStartVideo = async () => {
      if (typeof window.faceapi === 'undefined') {
        setStatus('Waiting for AI models to load...');
        setTimeout(loadModelsAndStartVideo, 1000);
        return;
      }

      try {
        setStatus('Loading AI models...');
        await Promise.all([
          window.faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),
          window.faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model')
        ]);
        
        setStatus('Requesting camera access...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus('Models loaded. Analyzing...');
      } catch (err) {
        console.error("Camera Error:", err);
        setStatus('Could not access camera. Please check permissions.');
      }
    };

    loadModelsAndStartVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (faceApiInterval.current) {
        clearInterval(faceApiInterval.current);
      }
    };
  }, []);

  const handleVideoPlay = () => {
    let lastDetectedEmotion = null;
    faceApiInterval.current = setInterval(async () => {
      if (videoRef.current && typeof window.faceapi !== 'undefined') {
        const detections = await window.faceapi.detectSingleFace(videoRef.current, new window.faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        if (detections && detections.expressions) {
          const expressions = detections.expressions;
          let primaryEmotion = 'neutral';
          let maxConfidence = 0;

          for (const [emotion, confidence] of Object.entries(expressions)) {
            if (emotion !== 'neutral' && confidence > maxConfidence) {
              maxConfidence = confidence;
              primaryEmotion = emotion;
            }
          }

          if (primaryEmotion !== 'neutral' && maxConfidence > 0.5 && primaryEmotion !== lastDetectedEmotion) {
            lastDetectedEmotion = primaryEmotion;
            onEmotionDetected(primaryEmotion);
          }
        }
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1001] animate-fadeIn">
      <div className="bg-black rounded-3xl w-[90%] max-w-2xl p-0 overflow-hidden relative border-4 border-white/10 shadow-2xl animate-scaleIn">
        <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 text-black rounded-full w-8 h-8 text-base cursor-pointer z-10">
          <i className="fas fa-times"></i>
        </button>
        <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted playsInline className="max-w-full block rounded-2xl"></video>
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 py-2 px-4 rounded-lg">{status}</p>
      </div>
    </div>
  );
};

const EmojiPicker = ({ onClose, onEmojiSelect }) => {
  const emojis = [
    { mood: 'Happy', emoji: '😊' },
    { mood: 'Sad', emoji: '😢' },
    { mood: 'Anxious', emoji: '😟' },
    { mood: 'Stressed', emoji: '😩' },
    { mood: 'Angry', emoji: '😠' },
    { mood: 'Calm', emoji: '😌' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1001] animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md text-center relative shadow-2xl animate-scaleIn">
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 text-gray-500 rounded-full w-8 h-8 text-base cursor-pointer">
          <i className="fas fa-times"></i>
        </button>
        <h2 className="text-2xl font-bold">How are you feeling?</h2>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {emojis.map(({ mood, emoji }) => (
            <div key={mood} onClick={() => onEmojiSelect(mood, emoji)} className="bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:border-indigo-500">
              <div className="text-5xl">{emoji}</div>
              <div className="font-semibold mt-2">{mood}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DurationPicker = ({ onClose, onDurationSelect }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[1001] animate-fadeIn">
            <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md text-center relative shadow-2xl animate-scaleIn">
                <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 text-gray-500 rounded-full w-8 h-8 text-base cursor-pointer">
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="text-2xl font-bold">Choose Your Duration</h2>
                <p className="text-gray-500 mt-2">How long would you like to practice?</p>
                <div className="flex flex-col gap-3 mt-6">
                    {[1, 2, 5].map(duration => (
                        <button key={duration} onClick={() => onDurationSelect(duration)} className="bg-gray-100 border border-gray-200 rounded-lg py-3 font-semibold cursor-pointer transition-all hover:bg-indigo-500 hover:text-white hover:border-indigo-500">
                            {duration} Minute{duration > 1 ? 's' : ''}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MeditationTimer = ({ params, onClose }) => {
    const { inhale, hold, exhale } = params;
    const [state, setState] = useState('Starting...');
    const [seconds, setSeconds] = useState(0);
    const progressRef = useRef(null);
    const radius = 115;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const sequence = [
            { state: 'Inhale', duration: inhale },
            { state: 'Hold', duration: hold },
            { state: 'Exhale', duration: exhale }
        ];
        let currentCycle = 0;
        let sequenceIndex = 0;
        let timer;

        const speak = (text) => {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        };

        const runCycle = () => {
            if (currentCycle >= params.cycles) {
                speak("Meditation complete. Well done.");
                onClose();
                return;
            }

            const { state, duration } = sequence[sequenceIndex];
            setState(state);
            speak(state);
            let secondsLeft = duration;

            timer = setInterval(() => {
                setSeconds(secondsLeft);
                const progress = (duration - secondsLeft) / duration;
                if (progressRef.current) {
                    progressRef.current.style.strokeDashoffset = circumference * (1 - progress);
                }

                if (secondsLeft <= 0) {
                    clearInterval(timer);
                    sequenceIndex++;
                    if (sequenceIndex >= sequence.length) {
                        sequenceIndex = 0;
                        currentCycle++;
                    }
                    runCycle();
                }
                secondsLeft--;
            }, 1000);
        };

        runCycle();

        return () => {
            clearInterval(timer);
            window.speechSynthesis.cancel();
        };
    }, [params, inhale, hold, exhale, onClose, circumference]);

    return (
        <div className="fixed inset-0 bg-indigo-900 bg-opacity-90 backdrop-blur-lg flex justify-center items-center z-[1001] animate-fadeIn">
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white rounded-full w-8 h-8 text-base cursor-pointer z-10">
                <i className="fas fa-times"></i>
            </button>
            <div className="text-center text-white">
                <div className="relative w-[250px] h-[250px]">
                    <svg width="250" height="250" className="transform -rotate-90">
                        <circle cx="125" cy="125" r={radius} className="fill-none stroke-white/20" strokeWidth="10"></circle>
                        <circle ref={progressRef} cx="125" cy="125" r={radius} className="fill-none stroke-white" strokeWidth="10" strokeLinecap="round" style={{ strokeDasharray: circumference }}></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <div className="text-4xl font-bold">{state}</div>
                        <div className="text-2xl opacity-80">{seconds}s</div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function WellnessChatbot() {
  useScript('https://cdn.tailwindcss.com');
  useScript('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js');
  useStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');


  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI wellness companion. I'm here to listen without judgment. Feel free to share what's on your mind.", isUser: false }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [isMeditationOpen, setIsMeditationOpen] = useState(false);
  const [meditationParams, setMeditationParams] = useState(null);
  const [language, setLanguage] = useState('English');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text, isUser, isCrisis = false) => {
    setMessages(prev => [...prev, { text, isUser, isCrisis }]);
  };

  const getAIResponse = async (messageText) => {
    setIsLoading(true);

    const fullPrompt = `You are an AI Wellness Companion. Your personality is warm, empathetic, supportive, and non-judgmental. Your expertise is in CBT and mindfulness. Your task is to analyze the user's message and respond according to the following strict rules, **always responding in ${language}**.

    **Rule 1: Crisis Safety (Highest Priority)**
    - Scan for keywords indicating severe distress (e.g., "kill myself", "suicide", "hopeless").
    - If found, your **ONLY** response must be: "It sounds like you are going through a very difficult time. Please know that your life is valuable and there is help available. It's important to talk to someone who can support you right now. You can connect with people who can support you by calling or texting 988 anytime in the US and Canada. In the UK, you can call 111. These services are free, confidential, and available 24/7. Please reach out for help." End this response with the tag [CRISIS].

    **Rule 2: Emotion-Based Support (If no crisis)**
    - Analyze for the primary emotion: sad, anxious, stressed, or happy.
    - **If the user asks to meditate or for a breathing exercise:** Provide a step-by-step guide for ONE breathing technique (e.g., Box Breathing). You **MUST** end your response with a special command: **[MEDITATE: inhale=4, hold=4, exhale=4]**, adjusting numbers as needed.
    - **If Sad:** Validate their feeling and suggest a self-compassion journaling prompt.
    - **If Anxious or Stressed:** Validate and suggest a detailed grounding technique (e.g., 5-4-3-2-1 method).
    - **If Happy:** Validate and suggest a gratitude journaling prompt.
    - **If Unclear/Neutral:** Reflect on what they said and ask a gentle, open-ended question.

    Analyze and respond to this user message: "${messageText}"`;

    const API_KEY = "AIzaSyCVAM4Gcdd_s3lQpzX-jX7DYE0tY0plFD8";
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "contents": [{"parts": [{ "text": fullPrompt }]}] }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        if (data.candidates?.[0]?.content?.parts?.[0]) {
            let botResponse = data.candidates[0].content.parts[0].text;
            const isCrisis = botResponse.includes('[CRISIS]');
            if (isCrisis) {
                botResponse = botResponse.replace('[CRISIS]', '').trim();
            }

            const meditationMatch = botResponse.match(/\[MEDITATE: inhale=(\d+), hold=(\d+), exhale=(\d+)\]/);
            if (meditationMatch) {
                const [, inhale, hold, exhale] = meditationMatch.map(Number);
                setMeditationParams({ inhale, hold, exhale });
                setIsDurationPickerOpen(true);
            }

            addMessage(botResponse.replace(/\[MEDITATE:.*?\]/, '').trim(), false, isCrisis);
        } else {
            addMessage("I'm having a little trouble processing that. Could you try rephrasing?", false);
        }
    } catch (error) {
        addMessage("I'm having trouble connecting right now. Please try again in a moment.", false);
    } finally {
        setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (userInput.trim() === '') return;
    addMessage(userInput, true);
    getAIResponse(userInput);
    setUserInput('');
  };

  const handleEmotionDetected = (emotion) => {
    const prompt = `The camera detected I might be feeling ${emotion}.`;
    addMessage(prompt, true);
    getAIResponse(prompt);
    setIsCameraOpen(false);
  };

  const handleEmojiSelect = (mood, emoji) => {
    const prompt = `I'm feeling ${mood.toLowerCase()} ${emoji}`;
    addMessage(prompt, true);
    getAIResponse(prompt);
    setIsEmojiPickerOpen(false);
  };

  const handleDurationSelect = (minutes) => {
    setMeditationParams(prev => ({ ...prev, cycles: Math.floor((minutes * 60) / (prev.inhale + prev.hold + prev.exhale)) }));
    setIsDurationPickerOpen(false);
    setIsMeditationOpen(true);
  };

  return (
    <>
      <style>{`
        .animate-fadeInUp { animation: fadeInUp 0.5s forwards cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-scaleIn { animation: scaleIn 0.3s ease; }
        @keyframes scaleIn { from { transform: scale(0.95); } to { transform: scale(1); } }
      `}</style>
      
      <button onClick={() => setIsOpen(true)} className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-500 text-white rounded-full shadow-lg text-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110">
        <i className="fas fa-brain"></i>
      </button>

      <div className={`fixed bottom-8 right-8 w-full max-w-md h-[90%] max-h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[1000] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95 pointer-events-none'}`}>
        <header className="p-4 text-center border-b border-gray-200 flex-shrink-0 relative flex items-center justify-between">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 transition-colors hover:border-indigo-500">
            <i className="fas fa-globe text-gray-500 mr-2"></i>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-sm font-medium border-none bg-transparent cursor-pointer outline-none appearance-none">
              <option value="English">English</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Marathi">मराठी</option>
              <option value="Urdu">اردو</option>
            </select>
          </div>
          <h1 className="text-lg font-semibold text-gray-800 absolute left-1/2 -translate-x-1/2">Wellness Companion</h1>
          <button onClick={() => setIsOpen(false)} className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-100 text-gray-500 rounded-full w-8 h-8 text-base cursor-pointer transition-colors hover:bg-gray-200">
            <i className="fas fa-times"></i>
          </button>
        </header>

        <main className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
          {messages.map((msg, index) => <Message key={index} message={msg} />)}
          {isLoading && <div className="self-start message py-3 px-5 rounded-2xl leading-relaxed bg-gray-100 text-gray-800 rounded-bl-lg">Thinking...</div>}
          <div ref={chatEndRef} />
        </main>

        <div className="p-4 border-t border-gray-200 flex-shrink-0 flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="How are you feeling?"
            className="flex-grow py-2 px-4 border border-gray-200 rounded-full outline-none text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button onClick={() => setIsEmojiPickerOpen(true)} className="w-11 h-11 flex-shrink-0 rounded-full text-gray-500 text-lg transition-colors hover:bg-gray-100 hover:text-indigo-500"><i className="fas fa-smile"></i></button>
          <button onClick={() => setIsCameraOpen(true)} className="w-11 h-11 flex-shrink-0 rounded-full text-gray-500 text-lg transition-colors hover:bg-gray-100 hover:text-indigo-500"><i className="fas fa-camera"></i></button>
          <button onClick={handleSend} className="w-11 h-11 flex-shrink-0 rounded-full bg-indigo-500 text-white text-lg shadow-md transition-all hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5"><i className="fas fa-paper-plane"></i></button>
        </div>
      </div>

      {isCameraOpen && <CameraView onClose={() => setIsCameraOpen(false)} onEmotionDetected={handleEmotionDetected} />}
      {isEmojiPickerOpen && <EmojiPicker onClose={() => setIsEmojiPickerOpen(false)} onEmojiSelect={handleEmojiSelect} />}
      {isDurationPickerOpen && <DurationPicker onClose={() => setIsDurationPickerOpen(false)} onDurationSelect={handleDurationSelect} />}
      {isMeditationOpen && <MeditationTimer params={meditationParams} onClose={() => setIsMeditationOpen(false)} />}
    </>
  );
}
