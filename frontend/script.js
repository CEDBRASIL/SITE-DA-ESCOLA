const api = '/api';

async function uploadArquivo() {
    const file = document.getElementById('fileInput').files[0];
    const form = new FormData();
    form.append('file', file);
    await fetch(`${api}/arquivos/upload`, { method: 'POST', body: form });
    listarArquivos();
}

async function listarArquivos() {
    const r = await fetch(`${api}/arquivos/`);
    const data = await r.json();
    const ul = document.getElementById('listaArquivos');
    ul.innerHTML = data.map(a => `<li>${a.id} - ${a.nome_original}</li>`).join('');
}

async function criarLista() {
    const nome = document.getElementById('nomeLista').value;
    await fetch(`${api}/listas/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nome})
    });
    listarListas();
}

async function listarListas() {
    const r = await fetch(`${api}/listas/`);
    const data = await r.json();
    const ul = document.getElementById('listaListas');
    ul.innerHTML = data.map(l => `<li>${l.id} - ${l.nome}</li>`).join('');
}

async function criarMensagem() {
    const identificador = document.getElementById('identificador').value;
    const conteudo = document.getElementById('conteudo').value;
    await fetch(`${api}/mensagens/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({identificador, tipo: 'texto', conteudo})
    });
    listarMensagens();
}

async function listarMensagens() {
    const r = await fetch(`${api}/mensagens/`);
    const data = await r.json();
    const ul = document.getElementById('listaMensagens');
    ul.innerHTML = data.map(m => `<li>${m.id} - ${m.identificador}</li>`).join('');
}

async function criarDisparo() {
    const lista_id = parseInt(document.getElementById('listaId').value);
    const mensagem_id = parseInt(document.getElementById('mensagemId').value);
    const agendado_para = document.getElementById('agendadoPara').value;
    await fetch(`${api}/disparos/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lista_id, mensagem_id, agendado_para})
    });
    listarDisparos();
}

async function listarDisparos() {
    const r = await fetch(`${api}/disparos/`);
    const data = await r.json();
    const ul = document.getElementById('listaDisparos');
    ul.innerHTML = data.map(d => `<li>${d.id} - ${d.status}</li>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    listarArquivos();
    listarListas();
    listarMensagens();
    listarDisparos();
});
