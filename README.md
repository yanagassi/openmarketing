# OpenMarketing

Bem-vindo ao OpenMarketing - Solução de Automação de Marketing Open Source

![Logo do GitHub](https://cdn.custom-cursor.com/cursors/stonks_meme_1254.png)

**Videos de Desenvolvimento**:

- [Roadmap do Projeto](ROADMAP.md)
- [Primeiros Passos](USEME.md)
- [Playlist do Youtube - Live Programing](https://www.youtube.com/playlist?list=PL0gLAlYtCg8BVv2m1fL6qO9New2ufpvxi)

## Visão Geral

O OpenMarketing é uma plataforma Open Source abrangente de automação de marketing projetada para ajudar empresas a otimizar suas estratégias de geração de leads, landing pages, e-mail marketing e pontuação de leads. Com uma abordagem flexível e intuitiva, o OpenMarketing capacita as equipes de marketing a criar campanhas eficazes, nutrir leads e melhorar o desempenho geral das atividades de marketing.

## 1. Geração de Leads

**Landing Pages**: Desenvolva landing pages atraentes sem a necessidade de habilidades de codificação.

**Formulários Intuitivos (ROADMAP)**: Crie formulários personalizados e intuitivos para capturar leads de maneira eficiente.

**Integração com Fontes de Dados (ROADMAP)**: Importe leads de diversas fontes, como redes sociais, websites e eventos.

### Funil de Vendas

Explore o Funil de Vendas no OpenMarketing e transforme visitantes em clientes leais, conduzindo-os por uma jornada simplificada e eficaz. Nosso funil é projetado para otimizar cada estágio, maximizando as chances de conversão.

![Funil de Vendas](/images/home_page.png)

#### Estágios do Funil:

**Visitante**:
No estágio de visitante, atraímos e cativamos potenciais interessados. Utilize estratégias de marketing para gerar tráfego e despertar o interesse inicial.

**Leads**:
Ao capturar informações valiosas, transformamos visitantes em leads. A Página de Leads fornece detalhes abrangentes sobre cada lead, permitindo uma compreensão mais profunda de suas necessidades e interesses.

**Oportunidade**:
Identifique leads qualificados que demonstram sinais de interesse significativo. Utilize o Lead Scoring para atribuir pontuações e destaque oportunidades promissoras para sua equipe de vendas.

**Venda**:
No estágio final, converta oportunidades em vendas bem-sucedidas. Utilize automações, campanhas personalizadas e insights do Funil de Vendas para fechar negócios de maneira eficiente.

### Lead

![Pagina de Lead](/images/lead_page.png)

**Pagina de Lead**: Explore detalhes abrangentes sobre cada lead, incluindo informações demográficas, interações anteriores e pontuações de interesse.

## 2. Ferramentas de Criação de Landing Pages

**Editor de Arrastar e Soltar**:

Desenvolva landing pages atraentes de forma intuitiva e sem a necessidade de habilidades de codificação. Nosso Editor de Arrastar e Soltar permite que você personalize o design, a disposição e os elementos da página de maneira simples, proporcionando total controle sobre a aparência e a experiência do usuário.

**Testes A/B**:

Otimize o desempenho das suas páginas com nossos Testes A/B integrados. Experimente diferentes variantes de suas landing pages para identificar as melhores estratégias de conversão. Analise os resultados em tempo real e ajuste sua abordagem para alcançar os melhores resultados. Com o OpenMarketing, aprimore continuamente suas páginas para maximizar o impacto nas suas campanhas de marketing.

![Pagina de Lead](/images/lp_edit.png)

Crie landing pages impressionantes sem complicações com a nossa Ferramenta de Criação no OpenMarketing. Utilize um editor visual intuitivo de arrastar e soltar para personalizar o design, incorporar elementos poderosos e garantir responsividade automática em todos os dispositivos. Transforme suas ideias em realidade e destaque sua marca, convertendo visitantes em leads qualificados de maneira eficiente.

![Pagina de Lead](/images/lp_result.png)

**Design**: Layout atrativo e elementos visualmente atraentes.

**Formulário Intuitivo**: Captura de leads de maneira eficiente e sem complicações.

**Responsividade**: Adaptação perfeita em diversos dispositivos para uma experiência consistente.

## 3. Lead Scoring

Dê pontos para ações realizadas pelos seus contatos e saiba automaticamente quem está mais interessado.

##### O que é o Lead Scoring:

Sua empresa gera leads, mas tem dificuldade em identificar quais têm mais chances de avançar no funil de vendas? O Lead Scoring possibilita dar pontos automaticamente para cada ação de seus contatos, definindo quem priorizar em suas ações de marketing e vendas por estar mais interessado em seu serviço ou produto.

##### Como Funciona:

É simples, dê pontuações específicas com base no comportamento de seus contatos, tais como:

Cargo, Setor ou Cidade do Lead
Abertura ou clique de e-mail
Conversão em páginas de captura
Visitas em páginas ou conclusão de fluxo de automação
E outras ações relevantes

**Configurações de Perfil**:

![Lead Scoring Perfil](/images/lead_scoring_perfil.png)
**_Ao definir notas (de 1 a 10) para os termos mais eficazes das principais propriedades dos Leads, sua base será automaticamente dividida em quatro grupos: A. B. C e D. sendo os Leads do grupo "A" aqueles com melhor perfil para vendas._**

![Lead Scoring Perfil](/images/lead_scoring_perfil_page.png)

O funcionamento do perfil é intuitivo. Consideremos um exemplo de média ponderada aplicada ao Lead Yan, cujos atributos são **calculados de acordo com a configuração do usuário**:

**Funcionamento**:

| Atributo                | Nota do Termo | Peso da Propriedade |
| ----------------------- | ------------- | ------------------- |
| Cargo                   | 5             | 30%                 |
| Renda                   | 7             | 20%                 |
| Download de Landingpage | 10            | 50%                 |

**Aplicando uma média ponderada**:

    (5×0.3)+(7×0.2)+(10×0.5) / 0.3+0.2+0.5
    = 1.5+1.4+5 / 1
    = 7.9/1.0
    = 7.9

Portanto, o Lead Yan terá uma pontuação de 7.9, refletindo as notas configuradas pelo usuário no sistema. Este processo simplificado permite uma avaliação clara e personalizada com base nos critérios estabelecidos.

**Configuração de Interesse**:

O algoritmo é projetado para calcular o interesse de um lead com base em um conjunto de regras predefinidas. Cada regra tem associada uma pontuação ("pts").

![Lead Scoring Interesse](/images/lead_scoring_interesse.png)

**Funcionamento**:

- Eventos do Lead:
  O algoritmo começa coletando os tipos de eventos que o lead realizou. Isso é feito percorrendo a lista de eventos do lead e armazenando os tipos de eventos ("type_event") em uma lista.

- Percorrendo as Regras:
  Em seguida, o algoritmo percorre cada regra presente na lista de regras fornecida como entrada ("rules").

- Comparação com Eventos da Regra:
  Para cada regra, ele obtém a pontuação associada ("pts") e percorre os eventos especificados pela regra ("events").
  Ele verifica se algum dos eventos associados à regra está presente na lista de eventos do lead.

- Atribuindo Pontos:
  Se um evento da regra for encontrado nos eventos do lead, a pontuação da regra é adicionada à pontuação total do lead ("total_pts").
  Isso significa que o lead recebe pontos por cumprir as condições especificadas em uma ou mais regras.

- Pontuação Final:
  O resultado final é a soma de todos os pontos obtidos pelas regras que o lead satisfez.

## 4. Automação (workflow) e E-mail Marketing

Campanhas Segmentadas (ROADMAP): Crie campanhas de e-mail altamente segmentadas para aumentar a relevância.

Automação de E-mails (ROADMAP): Configure sequências de e-mails automatizadas com base no comportamento do lead.

## 5. IA Generativa + Campanhas

(Roadmap - Draft)
