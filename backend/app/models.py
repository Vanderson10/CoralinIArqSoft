from pydantic import BaseModel
from typing import Optional


class ChatMessage(BaseModel):
    title: Optional[str] = None
    text: str
    key: str


class KeyValidation(BaseModel):
    key: str
