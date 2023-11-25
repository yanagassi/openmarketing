from repository.UsersRepository import UsersRepository
import json
from hashlib import sha256
from .Base.BaseAppService import BaseAppService
import jwt
from settings import JWT_SECRET


class UsersAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para usuários, utilizando o repositório de usuários.
        self._user_repository = UsersRepository()

    def get_all_users(self):
        """
        Obtém todos os usuários e converte o resultado para o formato JSON.

        :return: Uma representação JSON de todos os usuários.
        """
        result = self._user_repository.get_all_users()
        return self.class_to_json(result)

    def login(self, email, password):
        """
        Realiza o login do usuário com base no email e senha fornecidos.

        :param email: O email do usuário.
        :param password: A senha do usuário.
        :return: Um token JWT se o login for bem-sucedido, False caso contrário.
        """
        result = self._user_repository.get_user_by_email(email)

        if (
            not result
            or result.password != sha256(password.encode("utf-8")).hexdigest()
        ):
            return False

        jwt_body = result.get_jwt_safe_data()
        jwt_body["organization"] = jwt_body["organizations"][0]
        jwt_body["organizations"] = None

        token = jwt.encode(payload=jwt_body, key=JWT_SECRET)
        return token
