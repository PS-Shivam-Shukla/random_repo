import React, { useEffect, useState } from 'react';

export interface StreamingTextRendererProps {
  text: string;
  speedMs?: number;
  onComplete?: () => void;
  className?: string;
}

export const StreamingTextRenderer: React.FC<StreamingTextRendererProps> = ({
  text,
  speedMs = 15,
  onComplete,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index += 1;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [text, speedMs]);

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3 ml-0.5 bg-indigo-400 animate-pulse" />
      )}
    </span>
  );
};
