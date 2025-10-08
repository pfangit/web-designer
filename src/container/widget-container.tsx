import { Tabs } from 'antd';
import { Blocks, ListTree, History } from 'lucide-react';
import { useState } from 'react';
import WidgetCollapse from '../widgets';
import './widget-container.css';

const WidgetContainer = () => {
  const [activeKey, setActiveKey] = useState('blocks');
  const items = [
    {
      label: <Blocks />,
      key: '',
      children: <WidgetCollapse />
    },
    {
      label: <ListTree />,
      key: '2',
      children: 'tree'
    },
    {
      label: <History />,
      key: '3',
      children: 'history'
    }
  ];

  return (
    <div className="widget-container">
      <Tabs
        className={'h-full w-[300px]'}
        onChange={(key) => {
          setActiveKey(key);
        }}
        defaultActiveKey={activeKey}
        tabPosition="left"
        items={items}
      />
    </div>
  );
};

export default WidgetContainer;
