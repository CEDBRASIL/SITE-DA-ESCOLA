from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Contato, get_session
from ..schemas import ContatoCreate, Contato

router = APIRouter()

@router.post('/', response_model=Contato)
async def criar(dados: ContatoCreate, session: AsyncSession = Depends(get_session)):
    obj = Contato(**dados.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get('/', response_model=list[Contato])
async def listar(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Contato))
    return result.scalars().all()

@router.get('/{contato_id}', response_model=Contato)
async def obter(contato_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Contato, contato_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Contato não encontrado')
    return obj

@router.put('/{contato_id}', response_model=Contato)
async def atualizar(contato_id: int, dados: ContatoCreate, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Contato, contato_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Contato não encontrado')
    for k, v in dados.dict().items():
        setattr(obj, k, v)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.delete('/{contato_id}')
async def remover(contato_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Contato, contato_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Contato não encontrado')
    await session.delete(obj)
    await session.commit()
    return {'ok': True}
