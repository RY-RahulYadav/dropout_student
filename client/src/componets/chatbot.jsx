import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Namaste! I'm your Indian Government Assistant. How may I assist you today?", isUser: false }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, isUser: true };
      setMessages([...messages, userMessage]);
      setUserInput("");
      // Simulate bot response (replace with actual chatbot logic)
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Thank you for your inquiry. Our team will provide you with the relevant information shortly.", isUser: false }
        ]);
      }, 1000);
    }
  };

  const handleQuickReply = (reply) => {
    const userMessage = { text: reply, isUser: true };
    setMessages([...messages, userMessage]);
    // Simulate bot response (replace with actual chatbot logic)
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `Here's some information about ${reply}. Please let me know if you need more details.`, isUser: false }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chatbot-toggle fixed bottom-5 right-5 bg-black from-orange-500 to-green-700 text-white w-[5.1rem] h-[5.1rem] rounded-full shadow-lg flex justify-center items-center hover:scale-110 transition-all duration-300"
        >
           
          <img src="https://cdn-icons-png.freepik.com/512/3649/3649460.png" alt="Chatbot avatar" className="w-[5rem] h-[5rem]" />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container bg-white w-80 fixed bottom-20 right-5 rounded-lg shadow-lg transition-all">
          <div className="chatbot-header bg-gradient-to-r from-orange-500 to-green-700 text-white p-4 flex justify-between items-center">
            <span>Indian Government Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>

          <div className="chatbot-messages p-4 h-64 overflow-y-auto bg-cover bg-center"
            style={{ backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202024-09-14%2014.53.02%20-%20A%20clean%20and%20professional%20background%20image%20for%20a%20chatbot%20interface%20representing%20an%20Indian%20government%20theme.%20The%20design%20should%20incorporate%20subtle%20elemen-4XIcMaYQ2GjkPWSWsf33QQtCzSBPn4.webp')` }}
          >
            {messages.map((message, index) => (
              <div key={index} className={`message mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                {!message.isUser && (
                  <img src="/placeholder.svg?height=30&width=30" alt="Bot avatar" className="w-8 h-8 rounded-full mr-2" />
                )}
                <div className={`p-2 rounded-2xl text-white ${message.isUser ? 'bg-green-700' : 'bg-orange-500'} max-w-xs`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="quick-replies flex flex-wrap gap-2 p-4 bg-white">
            {['Government Schemes', 'Digital India', 'e-Governance', 'Public Services'].map(reply => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="quick-reply bg-white border border-orange-500 text-orange-500 px-2 py-1 rounded-full text-sm hover:bg-orange-500 hover:text-white transition-all"
              >
                {reply}
              </button>
            ))}
          </div>

          <div className="chatbot-input flex p-4 bg-gray-100">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none"
            />
            <button
              onClick={handleUserInput}
              className="bg-gradient-to-r from-orange-500 to-green-700 text-white px-4 py-2 ml-2 rounded-full focus:outline-none hover:opacity-90 transition-all"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;