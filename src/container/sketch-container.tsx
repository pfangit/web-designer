import { useState, type DragEvent, useEffect } from 'react';
import emitter from '../events/emitter.ts';
import type { WidgetItem } from '../widgets/widget-items.tsx';
import { ProForm } from '@ant-design/pro-components';
import WidgetWrapper, { type ComponentInstance } from '../widgets/widget-wrapper.tsx';
import { nanoid } from 'nanoid';

const SketchContainer = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer) {
      const item = JSON.parse(e.dataTransfer.getData('component')) as WidgetItem;

      // 创建组件实例
      const id = nanoid(10);
      const componentInstance: ComponentInstance = {
        ...item,
        id: id,
        key: id
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
    return (
      <WidgetWrapper
        key={component.id}
        setDropIndex={setDropIndex}
        component={component}
        index={index}
        dropIndex={dropIndex}
      />
    );
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={`flex-1 overflow-y-auto bg-white p-4 border-2 border-dashed ${isDragOver ? 'border-blue-500' : 'border-transparent'} `}
    >
      {components.length > 0 && (
        <ProForm className="">
          <div
            className="min-h-[200px]"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // 当在容器末尾拖拽时，设置插入位置为末尾
              setDropIndex(components.length);
            }}
          >
            {components.map((component, index) => renderComponent(component, index))}
            {/* 当dropIndex指向末尾时显示插入指示器 */}
            {dropIndex === components.length && components.length > 0 && (
              <div className="h-0.5 bg-blue-500 rounded-full mb-1"></div>
            )}
          </div>
        </ProForm>
      )}
      {components.length === 0 && (
        <div className="h-full flex items-center justify-center text-gray-400 border border-dashed text-center">
          拖拽组件到这里
        </div>
      )}
    </div>
  );
};

export default SketchContainer;
