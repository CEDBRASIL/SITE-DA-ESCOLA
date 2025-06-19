from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ..models import Disparo, get_session
from ..schemas import DisparoCreate, Disparo

router = APIRouter()

@router.post('/', response_model=Disparo)
async def criar(dados: DisparoCreate, session: AsyncSession = Depends(get_session)):
    obj = Disparo(**dados.dict(), status='pendente')
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get('/', response_model=list[Disparo])
async def listar(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Disparo))
    return result.scalars().all()

@router.get('/{disparo_id}', response_model=Disparo)
async def obter(disparo_id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(Disparo, disparo_id)
    if not obj:
        raise HTTPException(status_code=404, detail='Disparo não encontrado')
    return obj
