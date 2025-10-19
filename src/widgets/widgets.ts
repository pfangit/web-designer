import { Input, InputNumber, Rate, Select, Slider, Transfer, TreeSelect } from 'antd';

export const widgets: Record<string, any> = {
  input: Input,
  textarea: Input.TextArea,
  otp: Input.OTP,
  password: Input.Password,
  number: InputNumber,
  rate: Rate,
  slider: Slider,
  select: Select,
  'tree-select': TreeSelect,
  transfer: Transfer
};
