from .Base.BaseAppService import BaseAppService
import http.cookies
from settings import DEFAULT_EVENT, EMAIL_FIELD
from repository.EventsRepository import EventsRepository
from datetime import datetime, timedelta
from settings import EMAIL_FIELD

class EventsAppService(BaseAppService):
    
    def __init__(self):
        self._repo = EventsRepository()
        
    def register_event(self, body):
        organization_id = body["organization_id"]
        cookies = []
        email = None
        data = {}
        type_event = body.get("type", DEFAULT_EVENT)
        href = ""
        insert_id = None
         
        
        if "data" in body:
            data = body["data"]
            
            
        if "href" in body:
            href = body["href"]

        if "cookies" in body:
            cookie_string = body["cookies"]
            parsed_cookies = http.cookies.SimpleCookie(cookie_string)

            for key, morsel in parsed_cookies.items():
                cookies.append({f"{key}": morsel.value})

                if key == EMAIL_FIELD:
                    email = morsel.value
    
        email = body.get("email", email)
        
        # Calcula o timestamp para os últimos 5 segundos
        five_seconds_ago = datetime.now() - timedelta(seconds=1)

        # Verifica se existe um evento com os mesmos dados nos últimos 5 segundos
        existing_event = self._repo.get_by_filter({
            "email": email,
            "type_event": type_event,
            "data": data,
            "href": href,
            "cookies": cookies,
            "organization_id": organization_id,
            "event_date": {
                "$gte": five_seconds_ago - timedelta(seconds=2),
                "$lte": datetime.now() + timedelta(seconds=2),
            }
        })

        if len(existing_event) == 0:  # Verifica se não há evento idêntico
            # Se não houver evento idêntico nos últimos 5 segundos, insira o novo evento
            result = self._repo.insert_event({
                "email": email,
                "cookies": cookies,
                "data": data,
                "href": href,
                "organization_id": organization_id,
                "type_event": type_event,
                "event_date": datetime.now()
            })
            insert_id  = str(result)
            
        return insert_id
