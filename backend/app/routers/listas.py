from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Lista, get_session
from ..schemas import ListaCreate, Lista

router = APIRouter()

@router.post('/', response_model=Lista)
async def criar(dados: ListaCreate, session: AsyncSession = Depends(get_session)):
    obj = Lista(**dados.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get('/', response_model=list[Lista])
async def listar(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Lista))
    return result.scalars().all()

@router.get('/{lista_id}', response_model=Lista)
async def obter(lista_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Lista, lista_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Lista não encontrada')
    return obj

@router.put('/{lista_id}', response_model=Lista)
async def atualizar(lista_id: int, dados: ListaCreate, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Lista, lista_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Lista não encontrada')
    for k, v in dados.dict().items():
        setattr(obj, k, v)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.delete('/{lista_id}')
async def remover(lista_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Lista, lista_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Lista não encontrada')
    await session.delete(obj)
    await session.commit()
    return {'ok': True}
