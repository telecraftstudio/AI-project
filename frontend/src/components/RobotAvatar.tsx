interface Props {
  emotion: string
}

export const RobotAvatar = ({ emotion }: Props) => {
  const glow = emotion === 'Happy' ? 'shadow-cyan-400' : emotion === 'Analyzing' ? 'shadow-purple-500' : 'shadow-emerald-500'

  return (
    <div className={`h-16 w-16 rounded-full bg-cyber-700 border border-cyan-400/40 shadow-lg ${glow} animate-pulse`}>
      <div className="h-full flex items-center justify-center text-2xl">🤖</div>
    </div>
  )
}
