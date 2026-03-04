from datetime import datetime
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    mode: str = Field(default="strategy")
    explain_reasoning: bool = Field(default=False)


class MessageOut(BaseModel):
    role: str
    content: str
    emotion: str
    mode: str
    reasoning: str
    decision: str
    created_at: datetime | None = None


class ChatResponse(BaseModel):
    response: MessageOut
    short_term_memory: list[str]
    related_memories: list[MessageOut]
    logs: list[str]
