from hashlib import sha256

from pymongo import MongoClient
from settings import DATABASE_NAME, MONGO_URI


# Função para executar a migração
def run_migration():
    # Conecta ao banco de dados MongoDB
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]

    marketing_automation_collection = db["Users"]
    data = [
        {
            "name": "Admin",
            "email": "admin@admin.com",
            "pass": sha256("admin123".encode('utf-8')).hexdigest(),
        }
    ]
    marketing_automation_collection.insert_many(data)

    # Fecha a conexão com o banco de dados MongoDB
    client.close()

# Executa a migração
run_migration()
