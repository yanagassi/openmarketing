# Segmentos

- Dados do Lead (campo, tag, created_date, dono_lead)

  - Evento Disparado:
    Evento Especifico ou Origem do evento (EMAIL, SITE E OUTROS) (talvez vale fazer umas origens no banco, vamo ver.)

  A partir disso, ele vai olhar para um lead especifico, e buscar qual regra o segumento vai aplicar
  Pelo que eu pensei, toda classe além de ter que implementar um metodo de Run, para efetivamente rodar e retornar o array de boleanos, ela vai ter que ter um metodo de GET para retornar esse campo, de acordo com sua logica
  Penso isso pois, no caso do options de landingpage, vamos ter que ir lá no appservice e pegar as lps vinculadas as organizations para poder rodar.
  Acho que seria legal essa responsabilidade ficar para a classe de segmento especifico, pois a ideia é que os componentes de regras possam ser alterados.
  Acho que também até facilitiria para IAs like GPT criarem novas regras, passando somente uma classes de exemplo, infelizmente dar a classe acesso ao appservice, seja uma penalidade na arquitetura para facilitar o entendimento.

  Se transformar o type dos rules em class, a gente consigue colocar a regra de negocio nas classes
  Estancialas de maneira simples em um for que roda no rules, as classes vão retornar um array de booleanos.

  Utilizar o logic operations, para ver:

        caso AND: todos devem ser True
        caso OR: um item do array deve ser True

# LeadScoring

- É a primeira coisa a se fazer quando entra na plataforma

  - Ela é capaz de gerar os campos ˜importantes˜ para você utilizar nas landingpages, forms e etc.
  - Além de classificar dês do inicio os leads que vão entrnando:

    - Perfil: Você atribui os campos notas (estrelas) de 0 a 10 para alguns campos especificos, provavelmente ele registra essa numeração nos events (não sei se é explicito para o usuario) e provavelmente para calcular a ferramenta pega todos os events do tipo PERFIL, por exemplo, e faz uma media simples do perfil daquele usuario usando o criterio das estrelas, ele cria esses campos lá na aba das landingpages, e quando o usuario preenche o formulário (criação do lead), a ferramenta intercepta esses dados e já da uma pontuação inicial. E após isso, toda vez que o lead faz um update essa ferramenta de lead scoring é chamado.

    - Interesse: ela vai olhar para os events e vai calcular pontos para cada evento que estiver especificado pelo usuario. Nesse caso ela o usuario vai especificar no front end oque ele considera relevante equantos pontos ele da, a partir toda vez que ele precisar, ele vai chamar o endpoint de calculo que vai pegar os eventos daquele respectivo lead e vai somar as pontuações de acordo com a lista de interesses.

- Toda véz que há um novo valor de calculo, deve-se verificar se há alguma automação (wf a disparar).

# Possibilidades de disparos

- Autmoações (WF):
  - Todo update lead ou event disparado.
  - Quando o lead cai em um segmento
  - Lead scoring?

# Premissas:

- Ser o mais economico possivel: Infra e APIs externas
- Sempre tentar achar alternativa gratuita para tudo
- Deve ser simples de subir e test
