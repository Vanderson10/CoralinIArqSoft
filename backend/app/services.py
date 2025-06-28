from .models import ChatMessage
from .prompt import get_prompt, get_prompt_coloracao
from .database import save_message, get_messages_by_key, delete_messages_by_key
from groq import Groq


def get_previous_messages(key: str):
    """
    Retorna as interações formatadas para o LLM, seguindo as regras:
    1. Se houver uma única interação (par user + assistant), ela é enviada.
    2. Se houver entre 2 e 5 interações, todas são enviadas.
    3. Se houver mais de 5 interações, a primeira interação + as últimas 5 são enviadas.
    4. Sempre inclui a última mensagem do usuário, mesmo que não tenha a resposta do modelo ainda.
    """
    
    all_messages = list(get_messages_by_key(key))

    if not all_messages:
        return []

    def format_interaction(interaction):
        return [interaction["user"], interaction["assistant"]]

    # Agrupa as mensagens em interações de pares (user + assistant)
    interactions = []
    last_user_message = None
    formatted_messages = []

    for message in all_messages:
        if message["type"] == "system":
            formatted_messages.append({"role": message["type"], "content": message["message"]})
        elif message["type"] == "user":
            last_user_message = {"role": message["type"], "content": message["message"]}
        elif message["type"] == "assistant" and last_user_message:
            # Completa o par de interação com a resposta do modelo
            interactions.append({
                "user": last_user_message,
                "assistant": {"role": message["type"], "content": message["message"]}
            })
            last_user_message = None  # Reset para verificar novos pares

    # Se há uma última mensagem de usuário não pareada, ela é a última mensagem pendente
    last_message = last_user_message if last_user_message else None

    total_interactions = len(interactions)

    # Se não houver interações, retorna o prompt de sistema e a última mensagem do usuário
    if total_interactions == 0:
        if last_message:
            formatted_messages.append(last_message)
            return formatted_messages
        else: []

    # Se houver apenas uma interação, retorna o prompt de sistema + essa interação + a última mensagem do usuário (se houver)
    if total_interactions == 1:
        formatted_messages += format_interaction(interactions[0])
        if last_message:
            formatted_messages.append(last_message)
        return formatted_messages

    # Se houver entre 2 e 5 interações, retorna o prompt de sistema + todas as interações + a última mensagem do usuário (se houver)
    if 2 <= total_interactions <= 5:
        formatted_messages += [msg for interaction in interactions for msg in format_interaction(interaction)]
        if last_message:
            formatted_messages.append(last_message)
        return formatted_messages

    # Se houver mais de 5 interações, retorna o prompt de sistema + a primeira interação + as últimas 5 + a última mensagem do usuário (se houver)
    first_interaction = interactions[0] if total_interactions > 0 else None
    last_five_interactions = interactions[-5:]

    formatted_messages += format_interaction(first_interaction) if first_interaction else []
    formatted_messages += [msg for interaction in last_five_interactions for msg in format_interaction(interaction)]

    if last_message:
        formatted_messages.append(last_message)

    return formatted_messages


def interact_llm(key: str, previous_messages: list):
    """
    Interage com o LLM, salva e retorna a resposta.
    """
    model = Groq(
        api_key=key
    )

    chat_completion = model.chat.completions.create(
        messages=previous_messages,
        model="llama-3.1-70b-versatile",
        temperature=0.2,
    )
    response_llm = chat_completion.choices[0].message.content
    
    save_message(key, response_llm, "assistant")
    
    return response_llm


def assess_essay_service(message: ChatMessage):
    """
    Avalia a redação do usuário e interage com o LLM.
    """    
    if len(get_messages_by_key(message.key)) == 0:
        save_message(message.key, get_prompt(), "system")
        save_message(message.key, get_prompt_coloracao(), "system")
    
    save_message(message.key, message.text, "user")

    previous_messages = get_previous_messages(message.key)
    response_llm = interact_llm(message.key, previous_messages)

    return {"feedback": response_llm}


def end_chat_service(key: str):
    """
    Finaliza o chat e exclui todas as mensagens relacionadas à key.
    """
    messages = list(get_messages_by_key(key))
    
    if not messages:
        return True
    
    result = delete_messages_by_key(key)
    messages_after = list(get_messages_by_key(key))
    
    if not messages_after and result.deleted_count > 0:
        return True
    
    return False