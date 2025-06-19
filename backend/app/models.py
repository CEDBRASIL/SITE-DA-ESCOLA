import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey, func

PG_HOST = os.getenv('PG_HOST')
PG_PORT = os.getenv('PG_PORT')
PG_DB = os.getenv('PG_DB')
PG_USER = os.getenv('PG_USER')
PG_PASS = os.getenv('PG_PASS')

DATABASE_URL = (
    f"postgresql+asyncpg://{PG_USER}:{PG_PASS}@{PG_HOST}:{PG_PORT}/{PG_DB}"
)

engine = create_async_engine(DATABASE_URL, future=True, echo=False)
SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

def get_session():
    return SessionLocal()

class Lista(Base):
    __tablename__ = 'listas'

    id = Column(Integer, primary_key=True)
    nome = Column(Text, nullable=False)
    descricao = Column(Text)
    criado_em = Column(TIMESTAMP, server_default=func.now())
    contatos = relationship('Contato', back_populates='lista')
    disparos = relationship('Disparo', back_populates='lista')

class Contato(Base):
    __tablename__ = 'contatos'

    id = Column(Integer, primary_key=True)
    lista_id = Column(Integer, ForeignKey('listas.id'))
    nome = Column(Text)
    telefone = Column(Text, nullable=False)
    desc1 = Column(Text)
    desc2 = Column(Text)
    desc3 = Column(Text)
    lista = relationship('Lista', back_populates='contatos')

class Arquivo(Base):
    __tablename__ = 'arquivos'

    id = Column(Integer, primary_key=True)
    nome_original = Column(Text)
    caminho = Column(Text)
    criado_em = Column(TIMESTAMP, server_default=func.now())
    mensagens = relationship('Mensagem', back_populates='arquivo')

class Mensagem(Base):
    __tablename__ = 'mensagens'

    id = Column(Integer, primary_key=True)
    identificador = Column(Text, nullable=False)
    tipo = Column(Text, nullable=False)
    conteudo = Column(Text)
    arquivo_id = Column(Integer, ForeignKey('arquivos.id'))
    criado_em = Column(TIMESTAMP, server_default=func.now())
    arquivo = relationship('Arquivo', back_populates='mensagens')
    disparos = relationship('Disparo', back_populates='mensagem')

class Disparo(Base):
    __tablename__ = 'disparos'

    id = Column(Integer, primary_key=True)
    lista_id = Column(Integer, ForeignKey('listas.id'))
    mensagem_id = Column(Integer, ForeignKey('mensagens.id'))
    agendado_para = Column(TIMESTAMP)
    status = Column(Text, server_default='pendente')
    criado_em = Column(TIMESTAMP, server_default=func.now())
    lista = relationship('Lista', back_populates='disparos')
    mensagem = relationship('Mensagem', back_populates='disparos')
