import type { DragEvent } from 'react';
import emitter from '../events/emitter.ts';
import type { WidgetItem } from '../widgets/widget-items.tsx';

const SketchContainer = () => {
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      const item = JSON.parse(e.dataTransfer.getData('component')) as WidgetItem;
      console.log(item);
      emitter.emit('start-end', item);
    }
  };

  emitter.on('drag-start', (item: WidgetItem) => {
    console.log(item);
  });

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="flex-1 bg-gray-100"
    >
      <div className="">拖拽位置</div>
      <div>画布</div>
    </div>
  );
};

export default SketchContainer;
