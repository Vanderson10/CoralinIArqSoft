import pymongo
from datetime import datetime

client = pymongo.MongoClient("mongodb://10.158.0.3:27017/")
 
db = client["coralinia"]

chats_collection = db["chats"]


def save_message(key: str, text: str, message_type: str = "user"):
    """Salva uma mensagem no MongoDB."""
    message_data = {
        "key": key,
        "message": text,
        "type": message_type,
        "timestamp": datetime.now(),
    }
    chats_collection.insert_one(message_data)
    

def get_messages_by_key(key: str):
    """Recupera as mensagens do MongoDB com base na key."""
    messages = chats_collection.find({"key": key}).to_list(length=None) # ordenar por timestamp
    return messages


def delete_messages_by_key(key: str):
    """Exclui todas as mensagens do MongoDB com base na key."""
    result = chats_collection.delete_many({"key": key})
    return result