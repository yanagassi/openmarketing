RUN api/docker-compose.yml
RUN api/migrations/migration.py

- Premissas até agora
  - O campo de email e nome dos formulários de landigpage, deve ser fixos, existe uma dependencia na regra de negocio.
    - Sendo assim, todo form deve ter no minimo o email, qunado tiver nome deve estar em um campo com name estipulado (settings.py) (EMAIL_FIELD, NAME_FIELD)
