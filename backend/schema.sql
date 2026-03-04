CREATE TABLE IF NOT EXISTS conversation_messages (
    id SERIAL PRIMARY KEY,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    emotion VARCHAR(50) NOT NULL,
    mode VARCHAR(50) NOT NULL DEFAULT 'strategy',
    reasoning TEXT NOT NULL,
    decision TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversation_messages_created_at
    ON conversation_messages (created_at DESC);
