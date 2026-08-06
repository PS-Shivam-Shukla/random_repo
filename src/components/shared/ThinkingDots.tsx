/**
 * ThinkingDots — 3-dot AI thinking animation
 * Signals that an AI agent is currently processing.
 * Inspired by: Claude AI, ChatGPT
 */
interface ThinkingDotsProps {
  className?: string;
  color?: string;
}

export function ThinkingDots({ className = '', color = 'bg-violet-500 dark:bg-violet-400' }: ThinkingDotsProps) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-label="AI thinking">
      <span className={`thinking-dot h-1.5 w-1.5 rounded-full ${color}`} />
      <span className={`thinking-dot h-1.5 w-1.5 rounded-full ${color}`} />
      <span className={`thinking-dot h-1.5 w-1.5 rounded-full ${color}`} />
    </span>
  );
}
