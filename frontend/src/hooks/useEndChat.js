import { useEffect } from "react";
import axios from "axios";

const useEndChat = (storedKey) => {
  useEffect(() => {
    const endChat = async () => {
      try {
        await axios.delete(`http://35.215.254.172:9000/end-chat/${storedKey}`);
      } catch (error) {
        console.error("Erro ao finalizar o chat:", error);
      }
    };

    const handleBeforeUnload = (event) => {
      endChat();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [storedKey]);
};

export default useEndChat;
