import React, {
  useReducer, cloneElement, Children, useEffect,
} from 'react';

export default function ShowN({ n, duration, children }) {
  const [showSet, showNext] = useReducer((prev) => (prev + 1) % (children.length / n), 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const interval = setInterval(showNext, duration);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(interval);
  }, [typeof window, duration]);

  return Children.map(children, (child, i) => (
    <div style={{
      opacity: Math.floor(i / n) === showSet ? 1 : 0,
      transition: 'opacity 1s',
      margin: 0,
    }}
    >
      {cloneElement(child, {
        style: {
          display: Math.floor(i / n) === showSet ? 'block' : 'none',
        },
      })}
    </div>
  ));
}
