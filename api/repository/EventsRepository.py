from entities.CollectionsRegister import CollectionsRegister

from .Base.BaseRepository import BaseRepository


class EventsRepository(): 
    def __init__(self):
        self._repository = BaseRepository()
        
    def insert_event(self, event_data):
        return self._repository.insert(CollectionsRegister.EVENTS[1], event_data)
    
    
    def get_by_filter(self, filter={}):
        return self._repository.get_all(CollectionsRegister.EVENTS[1], filter)