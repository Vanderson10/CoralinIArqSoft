from .models import ChatMessage, KeyValidation
from .services import assess_essay_service
from fastapi import APIRouter, HTTPException
from groq import Groq
import groq

router = APIRouter()


@router.post("/assess-essay/")
async def assess_essay(message: ChatMessage):
    """Recebe a redação do usuário e interage com o LLM para avaliação imediata."""
    try:
        return assess_essay_service(message)
    except groq.APIStatusError as e:
        raise HTTPException(
            status_code=e.status_code, detail=f"Erro na API do Groq: {e}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Ocorreu um erro inesperado: {e}")


@router.post("/validate-key")
async def validate_key(key_data: KeyValidation):
    """Valida se a chave da API do Groq é funcional."""
    try:
        client = Groq(api_key=key_data.key)
        client.models.list()
        return {"valid": True}
    except Exception as e:
        print(f"Erro ao validar a chave da API: {e}")
        return {"valid": False}
