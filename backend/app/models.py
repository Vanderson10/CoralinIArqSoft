from pydantic import BaseModel

class ChatMessage(BaseModel):
    title: str
    text: str
    key: str


class KeyValidation(BaseModel):
    key: str
