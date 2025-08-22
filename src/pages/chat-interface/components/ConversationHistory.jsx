import React from 'react';
import Icon from '../../../components/AppIcon'; // Adjust path if needed

const ConversationHistory = ({ history, onSelectConversation, isVisible, onClose }) => {
    // Helper to format the date for display (e.g., "Today", "Yesterday", "August 21, 2025")
    const formatDateGroup = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
        
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Group conversations by date
    // ADDED: A check to ensure 'history' is an array before trying to reduce it.
    // This prevents the component from crashing if the history prop is not yet available.
    const groupedHistory = Array.isArray(history) ? history.reduce((acc, item) => {
        if (item && item.date) { // Ensure item and date exist
            const dateKey = new Date(item.date).toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(item);
        }
        return acc;
    }, {}) : {};

    const sortedDateKeys = Object.keys(groupedHistory).sort((a, b) => new Date(b) - new Date(a));

    const getTopicIcon = (type) => {
        switch (type) {
            case 'Daily Checkin': return 'CalendarCheck';
            case 'Skill Building': return 'Zap';
            case 'Just Talk': return 'MessageCircle';
            default: return 'FileText';
        }
    };

    return (
        <aside className={`
            absolute lg:relative top-0 left-0 h-full lg:h-auto z-20
            w-full max-w-xs lg:max-w-none lg:w-80 
            bg-card border-r border-border flex flex-col
            transition-transform duration-300 ease-in-out
            ${isVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}>
            <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Conversation History</h2>
                <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
                    <Icon name="X" size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {sortedDateKeys.length > 0 ? sortedDateKeys.map(dateKey => (
                    <div key={dateKey}>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">{formatDateGroup(dateKey)}</h3>
                        <div className="space-y-3">
                            {groupedHistory[dateKey].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onSelectConversation(item.id)}
                                    className="w-full text-left p-3 rounded-lg hover:bg-surface transition-colors focus:outline-none focus:bg-surface"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-surface rounded-md flex items-center justify-center flex-shrink-0 mt-1">
                                            <Icon name={getTopicIcon(item.type)} size={18} className="text-therapeutic-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-sm font-semibold text-foreground truncate">{item.type}</h4>
                                                {item.isBreakthrough && (
                                                    <span className="text-xs flex-shrink-0 font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Breakthrough</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{item.summary}</p>
                                            <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-2">
                                                <span>{item.messageCount} messages</span>
                                                {item.tags && item.tags.slice(0, 2).map(tag => (
                                                    <span key={tag} className="bg-surface px-1.5 py-0.5 rounded">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10">
                        <p className="text-sm text-muted-foreground">No saved conversations yet.</p>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default ConversationHistory;
