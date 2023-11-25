from hashlib import sha256

from pymongo import MongoClient
MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "marketing_automation"


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
            "password": sha256("admin123".encode('utf-8')).hexdigest(),
            "organizations": [{
                "name": "Fantasia Corporate",
                "url": "fantasiacorporate.com",
            }]
        }
    ]
    marketing_automation_collection.insert_many(data)

    # Fecha a conexão com o banco de dados MongoDB
    client.close()

# Executa a migração
run_migration()
