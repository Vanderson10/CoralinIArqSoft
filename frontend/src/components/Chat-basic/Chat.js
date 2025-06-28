import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { ScrollPanel } from 'primereact/scrollpanel';
import "./Chat.css";
import userAvatar from "../assets/logo192.png";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Olá, eu sou a Cora! Estou aqui para te ajudar fornecendo feedbacks sobre as suas redações dissertativas-argumentativas. Sinta-se à vontade para começar quando desejar.", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText('');
      // Simulação de resposta da IA
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: "Mensagem da IA gerada automaticamente.", sender: "bot" }]);
      }, 1000);
    }
  };

  

  return (
    <div className="chat-container">
      <ScrollPanel className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.sender === "bot" && <Avatar image={userAvatar} shape="circle" className="avatar" />}
            <Card className={`message-bubble ${message.sender}`}>
              <p>{message.text}</p>
            </Card>
          </div>
        ))}
      </ScrollPanel>
      <div className="chat-input">
        <InputTextarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite a sua redação aqui"
          className="input-box"
          rows={1}
          autoResize
        />
        <Button icon="pi pi-send" onClick={sendMessage} className="send-button" />
      </div>
    </div>
  );
};

export default Chat;
