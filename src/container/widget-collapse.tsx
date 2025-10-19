import { Collapse, type CollapseProps } from 'antd';
import { type WidgetItem, widgetItems } from '../widgets/widget-items.tsx';
import { type DragEvent, type ReactNode } from 'react';
import emitter from '../events/emitter.ts';

const WidgetCollapse = () => {
  const renderWidget = (widgets?: WidgetItem[]): ReactNode => {
    // 对数量进行补充，非3的倍数（由于容器是 grid-cols-3 ）需填充空白元素，保证不会出现背景是d9d9d9的空白区域
    const remainder = (widgets || []).length % 3;
    const paddingCount = 3 - remainder;

    const padWidgets =
      remainder === 0
        ? widgets || []
        : (widgets || []).concat([
            {
              type: '',
              icon: <></>,
              name: '',
              style: {
                gridColumnStart: `span ${paddingCount}`
              }
            }
          ]);

    const handleDragStart = (e: DragEvent, item: WidgetItem) => {
      e.dataTransfer.setData('component', JSON.stringify(item));
      console.log('drag-start', item);
      emitter.emit('start-drag', item);
    };

    return (
      <div className="gap-[1px] grid grid-cols-3 bg-[#d9d9d9]">
        {padWidgets.map((item) => {
          return (
            <div
              draggable={true}
              key={item.type}
              style={item.style}
              onDragStart={(e) => handleDragStart(e, item)}
              className={`flex-col ${item.name ? 'cursor-grab hover:text-blue-400 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]' : ''} flex items-center justify-center bg-white p-1 text-gray-600 `}
            >
              <div className="pb-2 pt-2">{item.icon}</div>
              <div className="text-[12px] ">{item.name}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const items: CollapseProps['items'] = widgetItems.map((item) => {
    const { key, label, widgets } = item;
    return {
      key,
      label,
      children: renderWidget(widgets)
    };
  });

  return (
    <Collapse size={'small'} className="widget-container" items={items} defaultActiveKey={['1']} />
  );
};

export default WidgetCollapse;
