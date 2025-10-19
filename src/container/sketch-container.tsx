import { useState, type DragEvent } from 'react';
import emitter from '../events/emitter.ts';
import type { WidgetItem } from '../widgets/widget-items.tsx';

const SketchContainer = () => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer) {
      const item = JSON.parse(e.dataTransfer.getData('component')) as WidgetItem;
      console.log(item);
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

  emitter.on('drag-start', (item: WidgetItem) => {
    console.log(item);
  });

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      className={`flex-1 ${isDragOver ? 'border-2 border-dashed border-blue-500' : ''} bg-gray-100`}
    >
      <div className="">拖拽位置</div>
      <div>画布</div>
    </div>
  );
};

export default SketchContainer;
