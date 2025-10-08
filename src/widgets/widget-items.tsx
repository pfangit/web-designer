import { InputSource, TextAreaSource } from '../icons';
import WidgetIcon from './widget-icon.tsx';
import type { ReactElement } from 'react';

export type WidgetItem = { name: string; type: string; icon: ReactElement };

export type WidgetGroupItem = {
  key: string;
  label: string;
  widgets?: WidgetItem[];
};

export const widgetItems: WidgetGroupItem[] = [
  {
    key: 'inputs',
    label: '输入控件',
    widgets: [
      {
        type: 'input',
        name: '输入框',
        icon: <WidgetIcon src={InputSource} />
      },
      {
        type: 'textarea',
        name: '多行输入',
        icon: <WidgetIcon src={TextAreaSource} />
      }
    ]
  },
  {
    key: '2',
    label: '布局组件'
  },
  {
    key: '3',
    label: '自增组件'
  },
  {
    key: '4',
    label: '展示组件'
  }
];
