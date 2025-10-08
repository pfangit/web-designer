import { Collapse, type CollapseProps } from 'antd';
import { type WidgetItem, widgetItems } from '../widgets/widget-items.tsx';
import { type ReactNode } from 'react';

const WidgetCollapse = () => {
  const renderWidget = (widgets?: WidgetItem[]): ReactNode => {
    // 对数量进行补充，非3的倍数（由于容器是 grid-cols-3 ）需填充空白元素，保证不会出现背景是d9d9d9的空白区域
    const remainder = (widgets || []).length % 3;
    const paddingCount = 3 - remainder;

    const padWidgets =
      remainder === 0
        ? widgets || []
        : (widgets || []).concat(Array(paddingCount).fill({ type: '', icon: '', name: '' }));

    return (
      <div className="gap-[1px] grid grid-cols-3 bg-[#d9d9d9] cursor-grab ">
        {padWidgets.map((item) => {
          return (
            <div
              key={item.type}
              className="flex-col flex items-center justify-center bg-white p-1 text-gray-600 hover:text-blue-400 hover:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
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
