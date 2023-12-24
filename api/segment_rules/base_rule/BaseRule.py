class BaseRule:
    def run(self, lead_data):
        """
        Método a ser implementado por subclasses para definir a lógica da regra ao ser aplicada a dados de leads.

        :param lead_data: Dados relacionados ao lead. Obrigatório, pois aqui ele vai ver se faz sentido a regra no lead.
        :raise NotImplementedError: Deve ser levantada para indicar que este método deve ser implementado por subclasses.
        """
        raise NotImplementedError("Subclasses devem implementar o método run")

    def params(self, lead_data):
        """
        Método estático a ser implementado por subclasses para fornecer parâmetros ou configurações adicionais para a regra.

        :param lead_data: Dados adicionais do lead. Ele é utilizado em casos de options de campos, nos quais necessitam de listas de landing_pages, eventos e outras lógicas.
        :raise NotImplementedError: Deve ser levantada para indicar que este método deve ser implementado por subclasses.
        """
        raise NotImplementedError("Subclasses devem implementar o método params")
