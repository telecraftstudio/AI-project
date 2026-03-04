import json
from typing import Any

import redis
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models.conversation import ConversationMessage


class MemoryService:
    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client
        self.short_term_key = "ai_robot:short_term_memory"

    def remember_short_term(self, content: str, limit: int = 15) -> list[str]:
        self.redis.lpush(self.short_term_key, content)
        self.redis.ltrim(self.short_term_key, 0, limit - 1)
        return self.get_short_term_memory(limit=limit)

    def get_short_term_memory(self, limit: int = 15) -> list[str]:
        values = self.redis.lrange(self.short_term_key, 0, limit - 1)
        return [v.decode("utf-8") if isinstance(v, bytes) else str(v) for v in values]

    def store_long_term(self, db: Session, payload: dict[str, Any]) -> ConversationMessage:
        item = ConversationMessage(**payload)
        db.add(item)
        db.commit()
        db.refresh(item)
        return item

    def fetch_related_memories(self, db: Session, limit: int = 5) -> list[ConversationMessage]:
        stmt = select(ConversationMessage).order_by(desc(ConversationMessage.created_at)).limit(limit)
        return list(db.execute(stmt).scalars().all())

    def serialize_for_cache(self, message: ConversationMessage) -> str:
        return json.dumps({"role": message.role, "content": message.content, "emotion": message.emotion})
