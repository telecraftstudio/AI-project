from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.chat import MessageOut
from app.services.memory_service import MemoryService
from app.api.deps import get_redis_client

router = APIRouter(prefix="/memory", tags=["memory"])


@router.get("/long-term", response_model=list[MessageOut])
def get_long_term_memory(db: Session = Depends(get_db), redis_client=Depends(get_redis_client)):
    service = MemoryService(redis_client)
    memories = service.fetch_related_memories(db, limit=20)
    return [
        MessageOut(
            role=item.role,
            content=item.content,
            emotion=item.emotion,
            mode=item.mode,
            reasoning=item.reasoning,
            decision=item.decision,
            created_at=item.created_at,
        )
        for item in memories
    ]


@router.get("/short-term", response_model=list[str])
def get_short_term_memory(redis_client=Depends(get_redis_client)):
    service = MemoryService(redis_client)
    return service.get_short_term_memory(limit=20)
