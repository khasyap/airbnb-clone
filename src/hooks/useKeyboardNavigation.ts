import { useEffect, useCallback } from 'react';

interface Options {
  enabled: boolean;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export function useKeyboardNavigation({
  enabled,
  onEscape,
  onArrowLeft,
  onArrowRight,
}: Options) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault();
        onEscape();
      } else if (e.key === 'ArrowLeft' && onArrowLeft) {
        e.preventDefault();
        onArrowLeft();
      } else if (e.key === 'ArrowRight' && onArrowRight) {
        e.preventDefault();
        onArrowRight();
      }
    },
    [enabled, onEscape, onArrowLeft, onArrowRight]
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, handler]);
}
