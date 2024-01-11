import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "marketing_automation"

JWT_SECRET = "bcd0cb92e0ed68700de2424261db30a70c4bc810"


EMAIL_FIELD = "emailField"
NAME_FIELD = "nameField"

DEFAULT_EVENT = "UNDEFINED_EVENT"


RULES_SEED = 1222  # Utilizado para gerar os mesmos IDS de rules


MODE_EMAIL = "SMTP"  # SMTP | SENDGRID
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")


SMTP_CREDENTIALS = {
    "host": "smtp-mail.outlook.com",
    "port": 587,
    "email": os.getenv("SMTP_MAIL"),
    "password": os.getenv("SMTP_PASS"),
}
