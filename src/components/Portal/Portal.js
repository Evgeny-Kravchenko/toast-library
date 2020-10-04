import { useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal(props) {
  const el = document.createElement('div');
  useLayoutEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return createPortal(props.children, el);
}

export default Portal;
