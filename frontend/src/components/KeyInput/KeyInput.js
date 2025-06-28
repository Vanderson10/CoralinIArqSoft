import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import "./KeyInput.css";
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from "primereact/tooltip";

const KeyInput = ({ onKeyValid }) => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [saveToStorage, setSaveToStorage] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateKey = useCallback(
    async (key) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://35.215.254.172:9000/validate-key",
          { key }
        );
        if (response.data.valid) {
          onKeyValid(key);
          if (saveToStorage) {
            localStorage.setItem("GROQ_API_KEY", key);
          } else {
            sessionStorage.setItem("GROQ_API_KEY", key);
          }
        } else {
          setError("Chave inválida. Por favor, tente novamente.");
        }
      } catch (err) {
        setError("Erro ao validar chave.");
      } finally {
        setLoading(false);
      }
    },
    [onKeyValid, saveToStorage]
  );

  useEffect(() => {
    const storedKey =
      localStorage.getItem("GROQ_API_KEY") ||
      sessionStorage.getItem("GROQ_API_KEY");
    if (storedKey) {
      validateKey(storedKey);
    }
  }, [validateKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateKey(apiKey);
  };

  return (
    <div className="key-input-container">
      {loading ? (
        <div className="loading-container">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <h2>Bem-vindo ao CoralinIA</h2>
          <p>
            Insira sua chave API do{" "}
            <a
              href="https://groq.com"
              target="_blank"
              rel="noopener noreferrer"
              id="groqLink"
              data-pr-tooltip="Clique aqui para criar sua chave"
            >
              Groq
            </a>{" "}
            para continuar:
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Insira sua chave API do Groq"
            />
            <button type="submit">Validar</button>
          </form>
          {error && <p className="error">{error}</p>}
          <div className="flex align-items-center">
            <Checkbox
              value="Salvar no navegador"
              onChange={() => setSaveToStorage(!saveToStorage)}
              checked={saveToStorage}
            />
            <label className="text">
              {" Permite salvar chave API do Groq no navegador"}
            </label>
          </div>
        </>
      )}
      <Tooltip target="#groqLink" />
    </div>
  );
};

export default KeyInput;
