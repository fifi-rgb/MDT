import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Mic, MicOff, Loader, Bot, User } from 'lucide-react';

const API_ENDPOINT = process.env.REACT_APP_AI_API_ENDPOINT || 'http://localhost:8787';

function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userId] = useState(() => {
    // Generate or retrieve user ID
    let id = localStorage.getItem('userId');
    if (!id) {
      id = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', id);
    }
    return id;
  });

  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINT}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          userId: userId,
          context: {
            page: window.location.pathname,
            userAgent: navigator.userAgent
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp,
        model: data.model
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendVoiceMessage(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendVoiceMessage = async (audioBlob) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('userId', userId);

      const response = await fetch(`${API_ENDPOINT}/api/voice`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to process voice input');
      }

      const data = await response.json();

      // Add transcription as user message
      const userMessage = {
        role: 'user',
        content: data.transcription,
        timestamp: data.timestamp,
        inputType: 'voice'
      };

      // Add AI response
      const assistantMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, userMessage, assistantMessage]);
    } catch (error) {
      console.error('Voice chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I could not process your voice message. Please try typing instead.',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Tell me about NFT tickets",
    "How do I buy a ticket?",
    "What events are coming up?",
    "How does ticket verification work?"
  ];

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={24} />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by Llama 3.3</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot size={48} className="mx-auto text-purple-600 mb-4" />
                <h4 className="font-semibold text-gray-800 mb-2">
                  Hi! I'm your ticket assistant
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  Ask me anything about events, tickets, or NFTs!
                </p>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(question)}
                      className="block w-full text-left px-4 py-2 text-sm bg-white hover:bg-purple-50 text-gray-700 rounded-lg transition-colors border border-gray-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-200'
                  } ${msg.error ? 'bg-red-100 text-red-800 border-red-200' : ''}`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.inputType === 'voice' && (
                    <span className="text-xs opacity-75 mt-1 block">
                      🎤 Voice message
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-200">
                  <Loader size={16} className="animate-spin text-purple-600" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatAssistant;
