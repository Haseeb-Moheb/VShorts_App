import { useState } from 'react';

type UpdateAction = 'like' | 'unlike';

export const useOptimisticUpdate = (initialCount: number) => {
  const [count, setCount] = useState(initialCount);

  const updateOptimistically = (action: UpdateAction) => {
    setCount((prev) => (action === 'like' ? prev + 1 : prev - 1));
  };

  return { count, updateOptimistically };
};
