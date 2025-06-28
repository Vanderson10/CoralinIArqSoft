import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Chat from './components/Chat/Chat';
import LogoHeader from './components/LogoHeader/LogoHeader';
import CoralsFooter from './components/CoralsFooter/CoralsFooter'
import './App.css';
import ToogleTheme from './components/ToggleTheme/ToogleTheme';
import KeyInput from './components/KeyInput/KeyInput';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [apiKey, setApiKey] = useState(null);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    if (!darkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  const handleKeyValid = (key) => {
    setApiKey(key);
  };

  return (
    <div className={`app-container ${darkTheme ? 'dark-theme' : ''}`}>
      <ToogleTheme darkTheme={darkTheme} toggleTheme={toggleTheme} />
      <LogoHeader darkTheme={darkTheme}/>
      {apiKey ? (
        <>
          <Chat darkTheme={darkTheme} apiKey={apiKey} />
          <CoralsFooter darkTheme={darkTheme}/> 
        </>
      ) : (
        <KeyInput onKeyValid={handleKeyValid} />
      )}
    </div>
  );
};

export default App;
