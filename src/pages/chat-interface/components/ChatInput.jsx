import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isTyping, disabled, className = '' }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const quickEmojis = ['😊', '😢', '😰', '😡', '😌', '🤔', '💪', '🙏'];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        setMessage(prev => prev + transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition?.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const addEmoji = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    textareaRef?.current?.focus();
  };

  const quickActions = [
    
  ];

  return (
    <div className={`bg-card border-t border-border p-4 ${className}`}>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickActions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.urgent ? "outline" : "ghost"}
            size="xs"
            onClick={action?.action}
            className={`${action?.urgent ? 'border-accent text-accent hover:bg-accent hover:text-white' : ''}`}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={14}
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "MindfulBot is thinking..." : "Share what's on your mind..."}
            disabled={disabled}
            rows={3}
            className="w-full px-4 py-3 pr-24 bg-surface border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-therapeutic-primary focus:border-transparent text-foreground placeholder-muted-foreground"
          />
          
          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceInput}
            disabled={disabled || isListening}
            className={`absolute right-2 top-2 ${isListening ? 'text-accent animate-pulse' : ''}`}
          >
            <Icon name={isListening ? "MicOff" : "Mic"} size={18} />
          </Button>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Emoji Picker */}
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={disabled}
                iconName="Smile"
                iconPosition="left"
                iconSize={16}
              >
                Emoji
              </Button>
              
              {showEmojiPicker && (
                <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-therapeutic p-3 z-50">
                  <div className="grid grid-cols-4 gap-2">
                    {quickEmojis?.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addEmoji(emoji)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-surface rounded transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Character Count */}
            <span className="text-xs text-muted-foreground">
              {message?.length}/500
            </span>
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            disabled={!message?.trim() || disabled || message?.length > 500}
            loading={isTyping}
            iconName="Send"
            iconPosition="right"
            iconSize={16}
          >
            Send
          </Button>
        </div>
      </form>
      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-center space-x-2 mt-3 text-muted-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-therapeutic-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-therapeutic-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-therapeutic-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm">MindfulBot is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;