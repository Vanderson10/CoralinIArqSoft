import React, { useState, useRef, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { ScrollPanel } from "primereact/scrollpanel";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import "./Chat.css";
import userAvatarRoot from "../../assets/perfil.png";
import userAvatarDark from "../../assets/perfil-dark.png";
import ReactMarkdown from "react-markdown";
import useEndChat from "../../hooks/useEndChat";
import rehypeRaw from "rehype-raw";

const Chat = ({ darkTheme }) => {
  const userAvatar = darkTheme ? userAvatarDark : userAvatarRoot;

  const [messages, setMessages] = useState([
    {
      text: "Olá, eu sou a Cora! Estou aqui para te ajudar fornecendo feedbacks sobre as suas redações dissertativas-argumentativas. Sinta-se à vontade para começar quando desejar.",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const storedKey =
    localStorage.getItem("GROQ_API_KEY") ||
    sessionStorage.getItem("GROQ_API_KEY");

  useEndChat(storedKey);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [inputText]);

  const sendMessage = async () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, sender: "user" }]);
      setInputText("");

      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8000/assess-essay/",
          { title: "", text: inputText, key: storedKey }
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.feedback, sender: "bot" },
        ]);
      } catch (error) {
        let errorMessage = "Ocorreu um erro. Tente novamente mais tarde.";

        if (error.response) {
          const { status, detail } = error.response;

          if (status === 413) {
            errorMessage =
              detail ||
              "O limite de tokens foi atingido, diminua sua mensagem ou reinicie a aplicação!";
          } else if (status === 429) {
            errorMessage =
              detail ||
              "Muitas requisições foram feitas! Por favor, tente novamente mais tarde.";
          }
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, sender: "bot" },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`chat-container`}>
      <ScrollPanel className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            {message.sender === "bot" && (
              <Avatar image={userAvatar} shape="circle" className="avatar" />
            )}
            <Card
              className={`message-bubble ${message.sender} ${
                darkTheme ? "dark-mode" : ""
              }`}
            >
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {message.text}
              </ReactMarkdown>
            </Card>
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <Avatar image={userAvatar} shape="circle" className="avatar" />
            <Card className="message-bubble bot loading-spinner">
              <ProgressSpinner
                style={{ width: "30px", height: "30px" }}
                strokeWidth="5"
                fill="#EEEEEE"
                animationDuration=".5s"
              />
            </Card>
          </div>
        )}
      </ScrollPanel>
      <div className={`chat-input ${darkTheme ? "dark-mode" : ""}`}>
        <InputTextarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Digite a sua redação aqui"
          className={`input-box ${darkTheme ? "dark-mode" : ""}`}
          rows={1}
          autoResize={false}
          ref={inputRef}
        />
        <Button
          icon="pi pi-send"
          onClick={sendMessage}
          className="send-button"
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default Chat;
