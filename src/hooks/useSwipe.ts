import { useState, useRef, useCallback } from 'react';

interface SwipeConfig {
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
}

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const useSwipe = (handlers: SwipeHandlers, config: SwipeConfig = {}) => {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false,
  } = config;

  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos, setEndPos] = useState({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setStartPos({ x: clientX, y: clientY });
    setIsSwiping(true);
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isSwiping) return;
    setEndPos({ x: clientX, y: clientY });
  }, [isSwiping]);

  const handleEnd = useCallback(() => {
    if (!isSwiping) return;
    
    const deltaX = endPos.x - startPos.x;
    const deltaY = endPos.y - startPos.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (Math.max(absDeltaX, absDeltaY) > threshold) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          handlers.onSwipeRight?.();
        } else {
          handlers.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          handlers.onSwipeDown?.();
        } else {
          handlers.onSwipeUp?.();
        }
      }
    }

    setIsSwiping(false);
  }, [isSwiping, startPos, endPos, threshold, handlers]);

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    onTouchEnd: handleEnd,
  };

  const mouseHandlers = trackMouse ? {
    onMouseDown: (e: React.MouseEvent) => {
      handleStart(e.clientX, e.clientY);
    },
    onMouseMove: (e: React.MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    },
    onMouseUp: handleEnd,
  } : {};

  return {
    ...touchHandlers,
    ...mouseHandlers,
    isSwiping,
  };
};