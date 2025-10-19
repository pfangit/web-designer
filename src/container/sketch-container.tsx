import { useState, type DragEvent, useEffect } from 'react';
import emitter from '../events/emitter.ts';
import type { WidgetItem } from '../widgets/widget-items.tsx';
import type { InputProps } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { widgets } from '../widgets/widgets.ts';

interface ComponentInstance extends WidgetItem {
  id: string;
  props?: Record<string, any>;
}

const SketchContainer = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer) {
      const item = JSON.parse(e.dataTransfer.getData('component')) as WidgetItem;
      console.log(item);

      // 创建组件实例
      const componentInstance: ComponentInstance = {
        ...item,
        id: `${item.type}-${Date.now()}`
      };

      // 如果有插入位置，则在该位置插入组件，否则添加到末尾
      if (dropIndex !== null) {
        const newComponents = [...components];
        newComponents.splice(dropIndex, 0, componentInstance);
        setComponents(newComponents);
        setDropIndex(null);
      } else {
        setComponents((prev) => [...prev, componentInstance]);
      }

      emitter.emit('start-end', item);
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 只有当完全离开容器时才取消高亮
    if (e.target === e.currentTarget) {
      setIsDragOver(false);
    }
  };

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

  const emitListener = (item: WidgetItem) => {
    console.log(item);
  };

  // 事件监听处理
  useEffect(() => {
    emitter.on('drag-start', emitListener);

    return () => {
      emitter.off('drag-start', emitListener);
    };
  }, []);

  // 渲染组件的函数
  const renderComponent = (component: ComponentInstance, index: number) => {
    const Component = widgets[component.type] || (() => <div>未知组件类型: {component.type}</div>);
    return (
      <div
        className={`relative pt-2 border-t border-blue-500 mb-1 ${dropIndex === index ? 'border-blue-500' : 'border-transparent'}`}
        onDragOver={(e) => handleComponentDragOver(e, index)}
        onDragLeave={handleComponentDragLeave}
      >
        <Component {...(component.props as InputProps)} />
      </div>
    );
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={`flex-1 bg-gray-100 p-4 border-2 border-dashed ${isDragOver ? 'border-blue-500' : 'border-transparent'} `}
    >
      <ProForm>
        <div
          className="min-h-[200px]"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // 当在容器末尾拖拽时，设置插入位置为末尾
            setDropIndex(components.length);
          }}
        >
          {components.map((component, index) => (
            <div key={component.id} className="mb-2">
              {renderComponent(component, index)}
            </div>
          ))}
          {/* 当dropIndex指向末尾时显示插入指示器 */}
          {dropIndex === components.length && components.length > 0 && (
            <div className="h-0.5 bg-blue-500 rounded-full mb-1"></div>
          )}
        </div>
      </ProForm>
      {components.length === 0 && <div className="text-gray-400">拖拽位置</div>}
    </div>
  );
};

export default SketchContainer;
