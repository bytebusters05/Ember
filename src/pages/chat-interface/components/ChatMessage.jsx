import React from 'react';
import Icon from '../../../components/AppIcon';
import ReactMarkdown from 'react-markdown';

const ChatMessage = ({ message }) => {
  const { sender, content } = message;
  const isUser = sender === 'user';
  const isSystem = sender === 'system';

  // --- SIMPLIFIED STYLING LOGIC ---
  // This now uses standard class names that will work with your project.
  const messageStyles = isUser
    ? 'bg-primary text-primary-foreground' // Style for the user's messages
    : 'bg-card text-card-foreground';     // Style for the bot's messages

  const alignmentStyles = isUser ? 'self-end' : 'self-start';

  if (isSystem) {
    return (
      <div className="text-center text-xs text-muted-foreground my-2">
        {content}
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      
      {/* Bot Icon */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-card border">
          <Icon name="Brain" size={16} className="text-primary" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-[75%] p-3 rounded-lg ${messageStyles} ${alignmentStyles}`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          // This part correctly renders the bold text
          <div className="prose prose-sm text-card-foreground prose-strong:text-card-foreground">
             <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>

    </div>
  );
};

export default ChatMessage;