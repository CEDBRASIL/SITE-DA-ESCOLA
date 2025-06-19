from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import Base, engine
from .routers import arquivos, listas, contatos, mensagens, disparos

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app.include_router(arquivos.router, prefix="/api/arquivos", tags=["arquivos"])
app.include_router(listas.router, prefix="/api/listas", tags=["listas"])
app.include_router(contatos.router, prefix="/api/contatos", tags=["contatos"])
app.include_router(mensagens.router, prefix="/api/mensagens", tags=["mensagens"])
app.include_router(disparos.router, prefix="/api/disparos", tags=["disparos"])
