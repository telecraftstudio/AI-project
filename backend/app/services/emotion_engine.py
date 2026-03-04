from textblob import TextBlob


class EmotionEngine:
    """Simple sentiment-driven emotion simulation."""

    def detect(self, text: str) -> str:
        polarity = TextBlob(text).sentiment.polarity
        if polarity > 0.2:
            return "Happy"
        if polarity < -0.2:
            return "Concerned"
        if any(word in text.lower() for word in ["why", "how", "analyze", "explain"]):
            return "Analyzing"
        return "Thinking"
