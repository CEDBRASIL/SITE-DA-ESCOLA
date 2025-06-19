from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Mensagem, get_session
from ..schemas import MensagemCreate, Mensagem

router = APIRouter()

@router.post('/', response_model=Mensagem)
async def criar(dados: MensagemCreate, session: AsyncSession = Depends(get_session)):
    obj = Mensagem(**dados.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get('/', response_model=list[Mensagem])
async def listar(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Mensagem))
    return result.scalars().all()

@router.get('/{mensagem_id}', response_model=Mensagem)
async def obter(mensagem_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Mensagem, mensagem_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Mensagem não encontrada')
    return obj

@router.put('/{mensagem_id}', response_model=Mensagem)
async def atualizar(mensagem_id: int, dados: MensagemCreate, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Mensagem, mensagem_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Mensagem não encontrada')
    for k, v in dados.dict().items():
        setattr(obj, k, v)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.delete('/{mensagem_id}')
async def remover(mensagem_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Mensagem, mensagem_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Mensagem não encontrada')
    await session.delete(obj)
    await session.commit()
    return {'ok': True}
