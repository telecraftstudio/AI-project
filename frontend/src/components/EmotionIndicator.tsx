interface Props {
  emotion: string
}

export const EmotionIndicator = ({ emotion }: Props) => (
  <div className="rounded-xl border border-cyan-400/30 bg-cyber-800 p-3 text-sm">
    <span className="text-slate-400">Emotion State: </span>
    <span className="font-semibold text-cyan-300">{emotion}</span>
  </div>
)
