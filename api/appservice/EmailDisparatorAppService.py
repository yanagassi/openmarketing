import smtplib
import ssl
import os


from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, From, To, Subject, Content
from settings import SMTP_CREDENTIALS, MODE_EMAIL, SENDGRID_API_KEY
from settings import EMAIL_FIELD, NAME_FIELD

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from appservice.LandingPagesAppService import LandingPagesAppService
from bs4 import BeautifulSoup


class EmailDisparatorAppService:
    def __init__(self, organization_id, email=None):
        self._mode = MODE_EMAIL
        self._email = email
        self._organization_id = organization_id
        self._variables = self.get_variables()

    def send_email(self, lead):
        html = self._email["html"]
        subject = self._email["subject"]
        result = None

        for variable_actual in self._variables:
            if set(variable_actual["attributes"]).issubset(set(lead["data"].keys())):
                for i in variable_actual["attributes"]:
                    if i in lead["data"]:
                        html = html.replace(variable_actual["key"], lead["data"][i])

                for i in variable_actual["attributes"]:
                    if i in lead["data"]:
                        subject = subject.replace(
                            variable_actual["key"],
                            lead["data"][i],
                        )

        if self._mode == "SMTP":
            result = self._send_email_via_smtp(lead, html, subject)
        elif self._mode == "SENDGRID":
            result = self._send_email_via_sendgrid(lead, html, subject)

        else:
            print("Modo de e-mail não suportado.")
            return {"status": False, "message": "Modo de e-mail não suportado."}

    @staticmethod
    def html_to_text(html_content):
        """
        Converte conteúdo HTML para texto simples.
        """
        soup = BeautifulSoup(html_content, "html.parser")
        return soup.get_text()

    def get_variables(self):
        """
        Aqui é onde o sistema pega todos os campos do form, os agrupa de acordo com seu nome
        e gera variaveis para serem usadas em emails e comunicações.
        """
        groups = LandingPagesAppService().get_form_variables(self._organization_id)
        response = []

        for cod_label, ids in groups.items():
            response.append(
                {
                    "key": f"*|{cod_label}|*",
                    "value": f"Adicionar o {cod_label} do Lead",
                    "attributes": ids,
                }
            )

        return response

    def _send_email_via_smtp(self, lead, html, subject):
        message = MIMEMultipart("alternative")

        message["Subject"] = subject
        message["From"] = SMTP_CREDENTIALS["email"]
        message["To"] = lead["email"]

        text = " ".join(EmailDisparatorAppService.html_to_text(html).split())

        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")

        message.attach(part1)
        message.attach(part2)

        context = ssl.create_default_context()

        with smtplib.SMTP(SMTP_CREDENTIALS["host"], SMTP_CREDENTIALS["port"]) as server:
            server.starttls(context=context)
            server.login(SMTP_CREDENTIALS["email"], SMTP_CREDENTIALS["password"])
            server.sendmail(
                SMTP_CREDENTIALS["email"],
                lead["email"],
                message.as_string(),
            )

        result = {"status": True, "message": "E-mail enviado com sucesso via SMTP."}

        return result

    def _send_email_via_sendgrid(self, lead, html, subject):
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)

        from_email = From("gestao@easydoctor.com.br")
        to_email = To(lead["email"])
        subject = Subject(subject)
        content = Content("text/plain", html)

        mail = Mail(from_email, to_email, subject, content)

        response = sg.send(mail)

        result = {
            "status": response.status_code == 200,
            "message": "E-mail enviado com sucesso via SendGrid."
            if response.status_code == 200
            else "Falha no envio via SendGrid.",
        }

        return result
