import { widgets } from './widgets.ts';
import type { WidgetItem } from './widget-items.tsx';
import { type DragEvent, useEffect, useState } from 'react';
import { ProForm } from '@ant-design/pro-components';
import type { InputProps } from 'antd';
import { cn } from '../util/cn.ts';
import emitter from '../events/emitter.ts';

export interface ComponentInstance extends WidgetItem {
  // widget的id
  id: string;
  // widget的key值，用于form表单使用
  key: string;
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
  const [value, setValue] = useState<ComponentInstance>(component);

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

  const Component = widgets[value.type] || (() => <div>未知组件类型: {value.type}</div>);

  const [isFocused, setIsFocused] = useState(false);

  const insertBefore = dropIndex === index;

  useEffect(() => {
    const onPropsChange = (item: ComponentInstance) => {
      if (item.key === value.key) {
        console.log(item);
        setValue(item);
      }
    };

    emitter.on('props-change', onPropsChange);

    return () => {
      emitter.off('props-change', onPropsChange);
    };
  }, [value]);

  console.log(value);

  return (
    <div
      className={cn(
        'group mb-1 relative pt-1 pl-1 pr-1',
        'hover:border hover:border-blue-500',
        `${insertBefore ? 'border-t' : 'border'}`,
        `${isFocused || insertBefore ? 'border-blue-500' : 'border-transparent hover:border-dashed'}`
      )}
      onDragOver={(e) => handleComponentDragOver(e, index)}
      onDragLeave={handleComponentDragLeave}
      onClick={(event) => {
        event.stopPropagation();
        event.preventDefault();
        emitter.emit('widget-select', value);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
    >
      <div className="group text-gray-500 absolute right-0">
        <div className="flex gap-1">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration cursor-pointer">
            {value.id}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration">删除</div>
        </div>
      </div>
      <ProForm.Item {...value.props}>
        <Component {...(value.props as InputProps)} />
      </ProForm.Item>
    </div>
  );
};

export default WidgetWrapper;
