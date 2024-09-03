import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiImage } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";

const ImageChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Image Chat.",
      sender: "system",
      timestamp: new Date(),
    },
    {
      id: 2,
      image:
        "data:image/jpeg;base64,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",
      sender: "user",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: 3,
      text: "Hi there! I have a question about the effects of this Product on health.",
      sender: "user",
      timestamp: new Date(Date.now() - 55000),
    },
    {
      id: 4,
      text: "Thums Up contains harmful substances such as Caffeine, Acidity Regulator (338), and Sugar. High caffeine intake can lead to anxiety, insomnia, and increased heart rate. Excessive sugar consumption can cause obesity, diabetes, and tooth decay. The acidity regulator (338), often phosphoric acid, can weaken bones and teeth. Additionally, the caramel color (150D) has potential health risks if consumed in large amounts. Regular consumption of Thums Up may lead to long-term health issues due to these ingredients.",
      sender: "system",
      timestamp: new Date(Date.now() - 50000),
    },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
      // Simulate system response
      setTimeout(() => {
        const systemResponse = {
          id: messages.length + 2,
          text: "Thank you for your message. How else can I assist you today?",
          sender: "system",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, systemResponse]);
      }, 1000);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newMessage = {
          id: messages.length + 1,
          image: event.target.result,
          sender: "user",
          timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="fixed top-0 w-full bg-blue-600 text-white p-4 z-10">
        <h1 className="text-2xl font-bold text-center">Image Chat</h1>
      </header>
      <main className="flex-1 overflow-hidden pt-16 pb-20">
        <div
          ref={chatContainerRef}
          className="h-full overflow-y-auto px-4 py-2"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {message.text && <p>{message.text}</p>}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded content"
                    className="max-w-full h-auto rounded"
                  />
                )}
                <span className="text-xs opacity-75 block mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
          <label htmlFor="image-upload" className="mr-2 cursor-pointer">
            <FiImage className="text-blue-500 w-6 h-6" />
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              aria-label="Upload image"
            />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Type a message"
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Send message"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ImageChat;
