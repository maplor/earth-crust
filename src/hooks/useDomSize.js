import { useLayoutEffect, useState } from "react";

function getSize(dom) {
  if (!dom) {
    return { width: 0, height: 0 };
  }
  return {
    width: dom.clientWidth,
    height: dom.clientHeight,
  };
}

export default function useDomSize(domRef) {
  const [size, setSize] = useState(getSize);

  useLayoutEffect(() => {
    function handleResize() {
      if (domRef.current) {
        setSize((oldSize) => {
          const newSize = getSize(domRef.current);
          if ((oldSize.width !== newSize.width) || (oldSize.height !== newSize.height)) {
            return newSize;
          }
          return oldSize;
        });
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [domRef]);

  return size;
}