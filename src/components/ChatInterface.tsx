
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'client' | 'trainer';
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatInterfaceProps {
  trainer: {
    id: string;
    name: string;
    image: string;
    specialization: string[];
  };
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ trainer, onBack }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatId = `chat_${user?.id}_${trainer.id}`;

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(chatId);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with a welcome message from trainer
      const welcomeMessage: Message = {
        id: '1',
        senderId: trainer.id,
        senderName: trainer.name,
        senderRole: 'trainer',
        content: `Hi ${user?.name}! Welcome to your personalized fitness journey. I'm excited to work with you and help you achieve your goals. Feel free to ask me anything about your workout plans, nutrition, or any fitness-related questions!`,
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(chatId, JSON.stringify([welcomeMessage]));
    }
  }, [chatId, trainer.id, trainer.name, user?.name]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate trainer typing and response
  const simulateTrainerResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "Great question! Let me help you with that.",
        "That's a good observation. Here's what I recommend...",
        "I'm glad you're staying engaged with your fitness journey!",
        "Let's adjust your plan based on this feedback.",
        "You're making excellent progress! Keep it up!",
        "That's completely normal. Here's how we can address it...",
        "I'll create a customized plan for you based on this information.",
        "Remember to stay hydrated and get enough rest too!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const trainerMessage: Message = {
        id: Date.now().toString(),
        senderId: trainer.id,
        senderName: trainer.name,
        senderRole: 'trainer',
        content: randomResponse,
        timestamp: new Date().toISOString(),
        read: false
      };

      setMessages(prev => {
        const updated = [...prev, trainerMessage];
        localStorage.setItem(chatId, JSON.stringify(updated));
        return updated;
      });
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      senderName: user?.name || '',
      senderRole: 'client',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: true
    };

    setMessages(prev => {
      const updated = [...prev, userMessage];
      localStorage.setItem(chatId, JSON.stringify(updated));
      return updated;
    });

    setNewMessage('');
    
    // Simulate trainer response
    simulateTrainerResponse(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="w-10 h-10">
            <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
          </Avatar>
          <div>
            <h3 className="font-semibold">{trainer.name}</h3>
            <p className="text-sm opacity-90">{trainer.specialization.join(', ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {Object.entries(messageGroups).map(([date, dateMessages]) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <Badge variant="secondary" className="text-xs">{date}</Badge>
              </div>
              {dateMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderRole === 'client' ? 'justify-end' : 'justify-start'} mb-3`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.senderRole === 'client'
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderRole === 'client' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-sm p-3 max-w-[70%]">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{trainer.name} is typing...</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button 
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
