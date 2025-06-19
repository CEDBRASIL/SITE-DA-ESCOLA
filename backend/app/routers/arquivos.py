import os
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select
from ..models import Arquivo, get_session
from ..schemas import Arquivo as ArquivoSchema

router = APIRouter()
UPLOAD_DIR = os.path.join(os.getcwd(), 'uploaded')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post('/upload', response_model=ArquivoSchema)
async def upload(file: UploadFile = File(...), session: AsyncSession = Depends(get_session)):
    dest = os.path.join(UPLOAD_DIR, file.filename)
    with open(dest, 'wb') as f:
        f.write(await file.read())
    stmt = insert(Arquivo).values(nome_original=file.filename, caminho=dest)
    result = await session.execute(stmt)
    await session.commit()
    arquivo_id = result.inserted_primary_key[0]
    arquivo = await session.get(Arquivo, arquivo_id)
    return arquivo

@router.get('/', response_model=list[ArquivoSchema])
async def listar(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Arquivo))
    return result.scalars().all()
