from entities.CollectionsRegister import CollectionsRegister
from pymongo import MongoClient
from settings import DATABASE_NAME, MONGO_URI
import json
from bson.objectid import ObjectId


class BaseRepository:
    def __init__(self):
        self._connection = MongoClient(MONGO_URI)
        self._db = self._connection[DATABASE_NAME]

    @staticmethod
    def convert_ids_to_objectid(obj):
        """
        Converte todas as ocorrências da chave 'id' para ObjectId no objeto.
        """
        if isinstance(obj, list):
            return [BaseRepository.convert_ids_to_objectid(item) for item in obj]
        elif isinstance(obj, dict):
            return {
                key: BaseRepository.convert_ids_to_objectid(value)
                for key, value in obj.items()
            }
        elif isinstance(obj, str) and obj.startswith("ObjectId("):
            # Se a string começa com "ObjectId(", então é uma representação de ObjectId
            return ObjectId(obj[9:-1])
        return obj

    def __del__(self):
        try:
            self._connection.close()
        except:
            return

    def class_to_dict(self, cls):
        return cls.__dict__

    def class_to_json(self, objeto):
        if type(objeto) == list:
            return json.loads(json.dumps(objeto, default=self.class_to_dict))
        else:
            try:
                return json.loads(json.dumps(objeto.__dict__))
            except:
                return json.loads(json.dumps(objeto))

    def insert_many(self, collection, data):
        try:
            instancia_classe = getattr(CollectionsRegister, collection.upper())[0]()
            for chave in data:
                if chave == "_id":
                    data[chave] = str(data[chave])
                setattr(instancia_classe, chave, data[chave])
            insert = self._db[collection].insert_many(data)
            return insert.inserted_ids
        except Exception as e:
            print(e)
            return False

    def insert(self, collection, data):
        try:
            instancia_classe = getattr(CollectionsRegister, collection.upper())[0]()
            for chave in data:
                if chave == "_id":
                    data[chave] = str(data[chave])
                setattr(instancia_classe, chave, data[chave])

            insert = self._db[collection].insert_one(data)
            return insert.inserted_id
        except Exception as e:
            print(e)
            return False

    def get_all(self, collection, filter={}):
        try:
            res = self._db[collection].find(filter)
            final = []
            for i in res:
                instancia_classe = getattr(CollectionsRegister, collection.upper())[0]()
                for chave in i:
                    if chave == "_id":
                        i[chave] = str(i[chave])
                    setattr(instancia_classe, chave, i[chave])
                final.append(instancia_classe)

            return final
        except Exception as e:
            print(e)
            return False

    def get_by_id(self, collection, id):
        try:
            res = self._db[collection].find_one({"_id": ObjectId(id)})
            instancia_classe = getattr(CollectionsRegister, collection.upper())[0]()

            for chave in res:
                if chave == "_id":
                    res[chave] = str(res[chave])
                setattr(instancia_classe, chave, res[chave])

            return instancia_classe
        except Exception as e:
            print(e)
            return False

    def get_one(self, collection, filter={}):
        try:
            res = self._db[collection].find_one(filter)
            instancia_classe = getattr(CollectionsRegister, collection.upper())[0]()

            for chave in res:
                if chave == "_id":
                    res[chave] = str(res[chave])
                setattr(instancia_classe, chave, res[chave])

            return instancia_classe
        except Exception as e:
            print(e)
            return False

    def update_by_id(self, collection, id, data):
        try:
            insert = self._db[collection].update_one(
                {"_id": ObjectId(id)}, {"$set": self.class_to_json(data)}
            )
            return insert
        except Exception as e:
            print(e)
            return False
