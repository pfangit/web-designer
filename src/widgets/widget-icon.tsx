import { cloneElement, type JSX } from 'react';

const WidgetIcon = ({ src }: { src: JSX.Element }) => {
  return cloneElement(src, {
    height: 40,
    width: 80,
    fill: 'currentColor',
    viewBox: '0 0 1024 1024',
    focusable: 'false',
    'aria-hidden': 'true'
  });
};

export default WidgetIcon;
