from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class ListaBase(BaseModel):
    nome: str
    descricao: Optional[str] = None

class ListaCreate(ListaBase):
    pass

class Lista(ListaBase):
    id: int
    criado_em: datetime

    class Config:
        orm_mode = True

class ContatoBase(BaseModel):
    lista_id: int
    nome: Optional[str] = None
    telefone: str
    desc1: Optional[str] = None
    desc2: Optional[str] = None
    desc3: Optional[str] = None

class ContatoCreate(ContatoBase):
    pass

class Contato(ContatoBase):
    id: int

    class Config:
        orm_mode = True

class Arquivo(BaseModel):
    id: int
    nome_original: str
    caminho: str
    criado_em: datetime

    class Config:
        orm_mode = True

class MensagemBase(BaseModel):
    identificador: str
    tipo: str
    conteudo: Optional[str] = None
    arquivo_id: Optional[int] = None

class MensagemCreate(MensagemBase):
    pass

class Mensagem(MensagemBase):
    id: int
    criado_em: datetime

    class Config:
        orm_mode = True

class DisparoBase(BaseModel):
    lista_id: int
    mensagem_id: int
    agendado_para: datetime

class DisparoCreate(DisparoBase):
    pass

class Disparo(DisparoBase):
    id: int
    status: str
    criado_em: datetime

    class Config:
        orm_mode = True
