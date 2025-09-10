from .models import ChatMessage
from .prompt import get_prompt, get_prompt_coloracao
from groq import Groq


def assess_essay_service(message: ChatMessage):
    groq_api_key = message.key
    system_prompt = get_prompt() + "\n\n" + get_prompt_coloracao()
    messages_for_llm = [
        {
            "role": "system",
            "content": system_prompt
        },
        {
            "role": "user",
            "content": message.text
        }
    ]

    model = Groq(api_key=groq_api_key)

    chat_completion = model.chat.completions.create(
        messages=messages_for_llm,
        model="meta-llama/llama-4-maverick-17b-128e-instruct",
        temperature=0.2,
    )
    response_llm = chat_completion.choices[0].message.content

    return {"feedback": response_llm}


def end_chat_service(key: str):
    """
    Esta função se torna obsoleta no novo fluxo, mas pode ser mantida
    para evitar erros caso o frontend ainda a chame. Ela sempre retornará sucesso.
    """
    return True
