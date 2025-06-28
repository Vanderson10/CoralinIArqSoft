from .models import ChatMessage, KeyValidation
from .services import assess_essay_service, end_chat_service
from .database import chats_collection
from fastapi import APIRouter, HTTPException
from groq import Groq
import groq

router = APIRouter()

@router.post("/assess-essay")
async def assess_essay(message: ChatMessage):
    """Recebe a mensagem do usuário, recupera o histórico de mensagens e interage com o LLM."""
    try:
        return assess_essay_service(message)
    except groq.APIStatusError as e:
        raise HTTPException(
            status_code=e.status_code, detail=f"Erro: {e}")



@router.delete("/end-chat/{key}")
async def end_chat(key: str):
    """Finaliza o chat e exclui todas as mensagens relacionadas à key."""
    if end_chat_service(key):
        return {"message": "Chat finalizado e mensagens excluídas."}
    raise HTTPException(status_code=404, detail="A remoção não ocorreu!")


@router.post("/validate-key")
async def validate_key(key_data: KeyValidation):
    try:
        client = Groq(api_key=key_data.key)

        response = client.models.list()

        return {"valid": True} if response else {"valid": False}
    except Exception as e:
        print(f"Erro ao validar a chave da API: {e}")
        return {"valid": False}