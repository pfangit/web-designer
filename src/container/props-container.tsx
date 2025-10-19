import './props-container.less';
import { useEffect, useState } from 'react';
import emitter from '../events/emitter.ts';
import type { WidgetItem } from '../widgets/widget-items.tsx';

const PropsContainer = () => {
  const [component, setComponent] = useState<WidgetItem | null>(null);

  const widgetSelectListener = (component: WidgetItem) => {
    console.log('select', component);
    setComponent(component);
  };

  useEffect(() => {
    emitter.on('widget-select', widgetSelectListener);

    return () => {
      emitter.off('widget-select', widgetSelectListener);
    };
  });

  return <div className="props-container">{component?.name || ''}</div>;
};

export default PropsContainer;
