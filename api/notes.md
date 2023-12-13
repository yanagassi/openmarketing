# Segmentos

    Dados do Lead (campo, tag, created_date, dono_lead)

    Evento Disparado:
    Evento Especifico ou Origem do evento (EMAIL, SITE E OUTROS) (talvez vale fazer umas origens no banco, vamo ver.)

    A partir disso, ele vai olhar para um lead especifico, e buscar qual regra o segumento vai aplicar
    Pelo que eu pensei, toda classe além de ter que implementar um metodo de Run, para efetivamente rodar e retornar o array de boleanos, ela vai ter que ter um metodo de GET para retornar esse campo, de acordo com sua logica
    Penso isso pois, no caso do options de landingpage, vamos ter que ir lá no appservice e pegar as lps vinculadas as organizations para poder rodar.
    Acho que seria legal essa responsabilidade ficar para a classe de segmento especifico, pois a ideia é que os componentes de regras possam ser alterados.
    Acho que também até facilitiria para IAs like GPT criarem novas regras, passando somente uma classes de exemplo, infelizmente dar a classe acesso ao appservice, seja uma penalidade na arquitetura para facilitar o entendimento.

### Objeto inicial (idealizado)

    regras = [
            {
                "id": "",
                "logic_operation": "and",  # "or",
                "type": "convertion"
                "fields": [
                    {
                        "id":"HASH_ALEATORIO_1",
                        "name":"Tipo de Conversão",
                        "type":"select",
                        "options":[ "no evento", "a partir da origem" ],
                    },
                        {
                        "name":"Selecione o Evento",
                        "type":"select",
                        "options": ["tipos de evento"],
                        "restrict":{ # ESSE PARAMETRO OPICIONAL NO OBJETO, SÓ APARECE SE ALGUM CAMPO ESPECIFICO
                            # Se não tiver esse campo, ele é exibido no front, caso essa regra seja selecionada
                            # a ideia aqui é quie o frontend pegue o key e quando ele estiver com esse valor especifico, setado estaticamente pela regra, ele aparece ou não o campo.
                            "HASH_ALEATORIO_1": "no evento"
                        }
                    }
                ],
            }
        ]

Se transformar o type dos rules em class, a gente consigue colocar a regra de negocio nas classes
Estancialas de maneira simples em um for que roda no rules, as classes vão retornar um array de booleanos.

Utilizar o logic operations, para ver:

    caso AND: todos devem ser True
    caso OR: um item do array deve ser True
