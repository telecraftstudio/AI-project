from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_redis_client
from app.core.config import get_settings
from app.db.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_brain import AIBrain
from app.services.decision_engine import DecisionEngine
from app.services.emotion_engine import EmotionEngine
from app.services.memory_service import MemoryService
from app.services.reasoning_engine import ReasoningEngine

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db), redis_client=Depends(get_redis_client)):
    settings = get_settings()
    brain = AIBrain(
        reasoning_engine=ReasoningEngine(settings),
        emotion_engine=EmotionEngine(),
        decision_engine=DecisionEngine(),
        memory_service=MemoryService(redis_client),
    )
    response, short_memory, related, logs = brain.process(
        db,
        user_message=payload.message,
        mode=payload.mode,
        explain_reasoning=payload.explain_reasoning,
    )
    return ChatResponse(response=response, short_term_memory=short_memory, related_memories=related, logs=logs)
