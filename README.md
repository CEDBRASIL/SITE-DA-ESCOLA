# Disparo de Mensagens WhatsApp

Este módulo fornece uma API em FastAPI e uma interface web para gerenciar listas de contatos, mensagens e disparos de WhatsApp.

## Configuração

1. Copie `.env.example` para `.env` e ajuste as variáveis de acesso ao PostgreSQL.
2. Execute `docker compose up` para subir os serviços `api` e `db`.
3. Acesse `http://localhost:8000` para utilizar a API e `http://localhost:8000/frontend/index.html` para o frontend.

## Exemplos de uso com `curl`

### Listas
```bash
curl -X POST http://localhost:8000/api/listas/ -H 'Content-Type: application/json' -d '{"nome":"Clientes"}'
curl http://localhost:8000/api/listas/
```

### Contatos
```bash
curl -X POST http://localhost:8000/api/contatos/ -H 'Content-Type: application/json' -d '{"lista_id":1,"nome":"Joao","telefone":"5599999999"}'
```

### Mensagens
```bash
curl -X POST http://localhost:8000/api/mensagens/ -H 'Content-Type: application/json' -d '{"identificador":"promo","tipo":"texto","conteudo":"Ola"}'
```

### Arquivos
```bash
curl -F 'file=@/caminho/para/arquivo.jpg' http://localhost:8000/api/arquivos/upload
```

### Disparos
```bash
curl -X POST http://localhost:8000/api/disparos/ -H 'Content-Type: application/json' -d '{"lista_id":1,"mensagem_id":1,"agendado_para":"2024-01-01T10:00:00"}'
```

O worker `backend/app/worker.py` deve ser executado para processar os disparos.
