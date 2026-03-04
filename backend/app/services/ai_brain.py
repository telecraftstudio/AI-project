from sqlalchemy.orm import Session

from app.schemas.chat import MessageOut
from app.services.decision_engine import DecisionEngine
from app.services.emotion_engine import EmotionEngine
from app.services.memory_service import MemoryService
from app.services.reasoning_engine import ReasoningEngine


class AIBrain:
    def __init__(
        self,
        reasoning_engine: ReasoningEngine,
        emotion_engine: EmotionEngine,
        decision_engine: DecisionEngine,
        memory_service: MemoryService,
    ):
        self.reasoning_engine = reasoning_engine
        self.emotion_engine = emotion_engine
        self.decision_engine = decision_engine
        self.memory_service = memory_service

    def process(self, db: Session, user_message: str, mode: str, explain_reasoning: bool) -> tuple[MessageOut, list[str], list[MessageOut], list[str]]:
        logs: list[str] = []

        short_memory = self.memory_service.get_short_term_memory()
        logs.append("Loaded short-term memory from Redis")

        emotion = self.emotion_engine.detect(user_message)
        logs.append(f"Emotion detected: {emotion}")

        reasoning, answer = self.reasoning_engine.reason(user_message, short_memory, mode)
        logs.append("Reasoning engine generated strategy")

        decision = self.decision_engine.decide(user_message, emotion, mode)
        logs.append("Decision engine generated execution profile")

        if explain_reasoning:
            answer += f"\n\nSelf-Explanation:\n{reasoning}\n\nDecision Trace:\n{decision}"

        assistant_payload = {
            "role": "assistant",
            "content": answer,
            "emotion": emotion,
            "mode": mode,
            "reasoning": reasoning,
            "decision": decision,
        }

        saved = self.memory_service.store_long_term(db, assistant_payload)
        self.memory_service.remember_short_term(answer)
        logs.append("Persisted response to PostgreSQL and Redis")

        related = self.memory_service.fetch_related_memories(db)

        response = MessageOut(
            role=saved.role,
            content=saved.content,
            emotion=saved.emotion,
            mode=saved.mode,
            reasoning=saved.reasoning,
            decision=saved.decision,
            created_at=saved.created_at,
        )

        memories = [
            MessageOut(
                role=item.role,
                content=item.content,
                emotion=item.emotion,
                mode=item.mode,
                reasoning=item.reasoning,
                decision=item.decision,
                created_at=item.created_at,
            )
            for item in related
        ]

        return response, self.memory_service.get_short_term_memory(), memories, logs
