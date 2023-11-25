

class Users():
    def __init__(self,  
                 name="", 
                 email="", 
                 passw ="",
                 organizations = [], 
                 id = 0):
        self._id = id
        self.name = name
        self.passw = passw
        self.email = email
        self.organizations = organizations
        
    def get_jwt_safe_data(self):
        return{
            "_id": self._id,
            "name": self.name,
            "email": self.email,
            "organizations": self.organizations
        }