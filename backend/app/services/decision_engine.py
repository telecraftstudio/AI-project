class DecisionEngine:
    def decide(self, message: str, emotion: str, mode: str) -> str:
        urgency = "high" if any(k in message.lower() for k in ["urgent", "asap", "now"]) else "normal"
        risk = "elevated" if any(k in message.lower() for k in ["risk", "danger", "critical"]) else "standard"
        return (
            f"Decision profile => mode={mode}, urgency={urgency}, risk={risk}, emotion={emotion}. "
            "Proceed with iterative plan-execute-review cycle."
        )
