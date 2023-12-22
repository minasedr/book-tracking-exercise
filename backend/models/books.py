from pydantic import BaseModel
from typing import Optional


class Book(BaseModel):
    id: Optional[int]
    title: str
    status: Optional[int]
