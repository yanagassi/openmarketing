

class Users():
    def __init__(self,  
                 name="", 
                 email="", 
                 passw ="", 
                 id = 0):
        self._id = id
        self.name = name
        self.email = email
        
    def get_jwt_safe_data(self):
        return{
            "_id": self._id,
            "name": self.name,
            "email": self.email,
        }