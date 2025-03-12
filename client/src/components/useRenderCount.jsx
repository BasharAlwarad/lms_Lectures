import { useRef } from 'react';

export default function useRenderCount() {
  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log(`Render count: ${renderCount.current}`);
}
