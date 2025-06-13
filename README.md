# CED BRASIL Static Site

Este repositório contém o código do site estático do CED BRASIL, hospedado no Render. Não há arquivos de backend aqui; a comunicação com o sistema acontece via API.

## API

Algumas páginas, como `sistema/index.html`, fazem requisições à API https://api.cedbrasilia.com.br. Para desbloquear um aluno utilize:

```http
POST https://api.cedbrasilia.com.br/bloquear/{id_aluno}?status=0
```

Para bloquear utilize `status=1`.

A página de administração também usa endpoints para listar, excluir e atualizar alunos.
