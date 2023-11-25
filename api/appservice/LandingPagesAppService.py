from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import EMAIL_FIELD, NAME_FIELD
from repository.LandingPageRepository import LandingPageRepository
import json


class LandingPagesAppService(BaseAppService):
    def __init__(self):
        # Inicializa o serviço de aplicativo para leads, utilizando o repositório de leads.
        self._repo = LandingPageRepository()

    def get_landing_pages(self, id):
        return self._repo.get_by_id(id)
