import { widgets } from './widgets.ts';
import type { WidgetItem } from './widget-items.tsx';
import { type DragEvent, useState } from 'react';
import { ProForm } from '@ant-design/pro-components';
import type { InputProps } from 'antd';
import { cn } from '../util/cn.ts';
import emitter from '../events/emitter.ts';

interface ComponentInstance extends WidgetItem {
  id: string;
  props?: Record<string, any>;
}

const WidgetWrapper = ({
  component,
  index,
  dropIndex,
  setDropIndex
}: {
  component: ComponentInstance;
  index: number;
  dropIndex: number | null;
  setDropIndex: (index: number) => void;
}) => {
  // 处理组件之间的拖拽放置
  const handleComponentDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDropIndex(index);
  };

  const handleComponentDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const Component = widgets[component.type] || (() => <div>未知组件类型: {component.type}</div>);

  const [isFocused, setIsFocused] = useState(false);

  const insertBefore = dropIndex === index;

  return (
    <div
      className={cn(
        'group mb-1 relative pt-6 pl-1 pr-1',
        'hover:border hover:border-blue-500',
        `${insertBefore ? 'border-t' : 'border'}`,
        `${isFocused || insertBefore ? 'border-blue-500' : 'border-transparent hover:border-dashed'}`
      )}
      onDragOver={(e) => handleComponentDragOver(e, index)}
      onDragLeave={handleComponentDragLeave}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        emitter.emit('widget-select', component);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      <ProForm.Item>
        <Component {...(component.props as InputProps)} />
      </ProForm.Item>
    </div>
  );
};

export default WidgetWrapper;
