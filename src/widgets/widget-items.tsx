import {
  ArrayCardsSource,
  ArrayTableSource,
  CardSource,
  CascaderSource,
  CheckboxGroupSource,
  CollapseSource,
  DatePickerSource,
  DateRangePickerSource,
  FormLayoutSource,
  GridSource,
  InputSource,
  NumberPickerSource,
  ObjectSource,
  PasswordSource,
  RadioGroupSource,
  RateSource,
  SelectSource,
  SliderSource,
  SpaceSource,
  SwitchSource,
  TabSource,
  TextAreaSource,
  TextSource,
  TimePickerSource,
  TimeRangePickerSource,
  TransferSource,
  TreeSelectSource,
  UploadDraggerSource,
  UploadSource
} from '../icons';
import WidgetIcon from './widget-icon.tsx';
import type { CSSProperties, ReactElement } from 'react';

export type WidgetItem = {
  name: string;
  type: string;
  icon: ReactElement;
  style?: CSSProperties;
};

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
      },
      {
        type: 'password',
        name: '密码输入',
        icon: <WidgetIcon src={PasswordSource.light} />
      },
      {
        type: 'number',
        name: '数字输入',
        icon: <WidgetIcon src={NumberPickerSource} />
      },
      {
        type: 'rate',
        name: '评分器',
        icon: <WidgetIcon src={RateSource} />
      },
      {
        type: 'slider',
        name: '滑动条',
        icon: <WidgetIcon src={SliderSource} />
      },
      {
        type: 'select',
        name: '选择框',
        icon: <WidgetIcon src={SelectSource} />
      },
      {
        type: 'tree-select',
        name: '树选择',
        icon: <WidgetIcon src={TreeSelectSource} />
      },
      {
        type: 'cascader',
        name: '级联选择',
        icon: <WidgetIcon src={CascaderSource} />
      },
      {
        type: 'transfer',
        name: '穿梭框',
        icon: <WidgetIcon src={TransferSource} />
      },
      {
        type: 'checkbox',
        name: '复选框组',
        icon: <WidgetIcon src={CheckboxGroupSource} />
      },
      {
        type: 'radio',
        name: '单选框组',
        icon: <WidgetIcon src={RadioGroupSource} />
      },
      {
        type: 'date',
        name: '日期选择',
        icon: <WidgetIcon src={DatePickerSource.light} />
      },
      {
        type: 'date-range',
        name: '日期范围',
        icon: <WidgetIcon src={DateRangePickerSource.light} />
      },
      {
        type: 'time',
        name: '时间选择',
        icon: <WidgetIcon src={TimePickerSource} />
      },
      {
        type: 'time-range',
        name: '日期范围',
        icon: <WidgetIcon src={TimeRangePickerSource} />
      },
      {
        type: 'upload',
        name: '上传',
        icon: <WidgetIcon src={UploadSource} />
      },
      {
        type: 'upload-dragger',
        name: '拖拽上传',
        icon: <WidgetIcon src={UploadDraggerSource} />
      },
      {
        type: 'switch',
        name: '开关',
        icon: <WidgetIcon src={SwitchSource} />
      },
      {
        type: 'object',
        name: '对象容器',
        icon: <WidgetIcon src={ObjectSource} />
      }
    ]
  },
  {
    key: '2',
    label: '布局组件',
    widgets: [
      {
        type: 'card',
        name: '卡片',
        icon: <WidgetIcon src={CardSource.light} />
      },
      {
        type: 'grid',
        name: '网格布局',
        icon: <WidgetIcon src={GridSource} />
      },
      {
        type: 'tab',
        name: '卡片',
        icon: <WidgetIcon src={TabSource.light} />
      },
      {
        type: 'form',
        name: '表单布局',
        icon: <WidgetIcon src={FormLayoutSource} />
      },
      {
        type: 'collapse',
        name: '折叠面板',
        icon: <WidgetIcon src={CollapseSource.light} />
      },
      {
        type: 'column',
        name: '弹性间距',
        icon: <WidgetIcon src={SpaceSource} />
      }
    ]
  },
  {
    key: '3',
    label: '自增组件',
    widgets: [
      {
        type: 'collapse',
        name: '自增卡片',
        icon: <WidgetIcon src={ArrayCardsSource} />
      },
      {
        type: 'column',
        name: '自增表格',
        icon: <WidgetIcon src={ArrayTableSource.light} />
      }
    ]
  },
  {
    key: '4',
    label: '展示组件',
    widgets: [
      {
        type: 'text',
        name: '文本',
        icon: <WidgetIcon src={TextSource} />
      }
    ]
  }
];
