import asyncio
import json
import random
from datetime import datetime
from sqlalchemy import select
from .models import SessionLocal, Disparo, Mensagem, Contato
from .send import send_message

LOG_FILE = 'log.json'

def log(entry: dict):
    with open(LOG_FILE, 'a') as f:
        f.write(json.dumps(entry) + '\n')

async def processar():
    async with SessionLocal() as session:
        while True:
            result = await session.execute(
                select(Disparo).where(
                    Disparo.status == 'pendente',
                    Disparo.agendado_para <= datetime.utcnow()
                ).limit(1)
            )
            disparo = result.scalars().first()
            if not disparo:
                await asyncio.sleep(10)
                continue

            disparo.status = 'enviando'
            await session.commit()
            msg = await session.get(Mensagem, disparo.mensagem_id)
            contatos = (
                await session.execute(select(Contato).where(Contato.lista_id == disparo.lista_id))
            ).scalars().all()
            for contato in contatos:
                conteudo = msg.conteudo or ''
                await send_message(contato.telefone, conteudo)
                log({'telefone': contato.telefone, 'mensagem_id': msg.id, 'data': datetime.utcnow().isoformat()})
                delay = max(30, 50 + random.randint(-10, 10))
                await asyncio.sleep(delay)
            disparo.status = 'finalizado'
            await session.commit()

if __name__ == '__main__':
    asyncio.run(processar())
