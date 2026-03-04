from app.core.config import Settings


class ReasoningEngine:
    def __init__(self, settings: Settings):
        self.settings = settings

    def reason(self, message: str, memories: list[str], mode: str) -> tuple[str, str]:
        memory_context = " | ".join(memories[-3:]) if memories else "No prior memory"
        strategy_prefix = {
            "strategy": "I am optimizing for practical execution and outcomes.",
            "creative": "I am exploring unconventional and high-leverage creative ideas.",
            "deep_analysis": "I am performing deep analytical decomposition before conclusions.",
        }.get(mode, "I am reasoning with balanced intelligence.")

        reasoning = (
            f"{strategy_prefix} Input analysis: '{message}'. "
            f"Memory context considered: {memory_context}. "
            "I mapped intent, emotional cues, and actionability to craft a robust response."
        )

        answer = (
            f"Mode[{mode}] => Based on your request, here is my best recommendation: "
            f"{message.strip().capitalize()}. I suggest we execute this with staged validation and feedback loops."
        )

        return reasoning, answer
