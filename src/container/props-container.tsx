import './props-container.less';
import { useEffect, useRef, useState } from 'react';
import emitter from '../events/emitter.ts';
import { BetaSchemaForm, type ProFormInstance } from '@ant-design/pro-components';
import type { ComponentInstance } from '../widgets/widget-wrapper.tsx';

const PropsContainer = () => {
  const [component, setComponent] = useState<ComponentInstance | null>(null);
  const formRef = useRef<ProFormInstance>(null);

  const widgetSelectListener = (component: ComponentInstance) => {
    setComponent(component);
    formRef.current?.setFieldsValue(component.props);
  };

  useEffect(() => {
    emitter.on('widget-select', widgetSelectListener);

    return () => {
      emitter.off('widget-select', widgetSelectListener);
    };
  });

  const columns = [
    {
      title: '编码',
      dataIndex: 'id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项'
          }
        ]
      }
    },
    {
      title: '名称',
      dataIndex: 'label',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项'
          }
        ]
      }
    }
  ];

  if (component === null) {
    return (
      <div className="props-container p-2">
        <h1>属性</h1>
        请选择组件
      </div>
    );
  }

  return (
    <div className="props-container p-2">
      <h1>
        属性<span className={'text-gray-500'}>({component.id})</span>
      </h1>
      <BetaSchemaForm
        submitter={false}
        formRef={formRef}
        onFieldsChange={() => {
          const propsValue = formRef.current!.getFieldsValue();
          console.log(propsValue);
          emitter.emit('props-change', {
            ...component,
            id: propsValue.id,
            props: { ...component.props, ...propsValue }
          });
        }}
        layoutType="Form"
        columns={columns}
      />
    </div>
  );
};

export default PropsContainer;
