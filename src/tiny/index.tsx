import { useMergedState } from 'rc-util';
import React, { useRef } from 'react';
import { Thumb } from './Thumb';
import classNames from 'classnames';

interface InternalSegmentedProps {
  label: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  className: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    value: SegmentedOptions,
  ) => void;
}
const InternalSegmented = (props: InternalSegmentedProps) => {
  //
  const { label, value, checked, disabled, onChange, className } = props;
  //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    onChange(event, {
      label,
      value,
    });
  };
  //
  return (
    <label className={`rc-segmented-item ${className}`}>
      <input
        checked={checked}
        disabled={disabled}
        className="rc-segmented-item-input"
        type="radio"
        onChange={handleChange}
      />
      <div className="rc-segmented-item--label">{label}</div>
    </label>
  );
};

export type SegmentedValue = string | number;

interface SegmentedOptions {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SegmentedProps {
  value?: SegmentedValue;
  onChange?: (value: SegmentedValue) => void;
  options: SegmentedOptions[];
}

export function Segmented(props: SegmentedProps) {
  //
  const { value, onChange, options } = props;
  //
  const continerRef = useRef<HTMLDivElement>(null);
  //
  const [currentValue, setCurrentValue] = useMergedState(options[0].value, {
    value: value,
    onChange: onChange,
  });
  //
  return (
    <div className="rc-segmented" ref={continerRef}>
      <div className="rc-segmented-group">
        <Thumb
          containerRef={continerRef}
          motionName="thumb-motion"
          value={currentValue}
          getValueIndex={(value) => {
            return options.findIndex((op) => op.value === value);
          }}
        />
        {options.map((option) => {
          return (
            <InternalSegmented
              className={classNames({
                [`rc-segmented-item-selected`]:
                  // 为什么是 !thumbShow ? 因为在动画过程中，不应该切换选中态
                  // MotionThumb 移动完成之后将会消失在DOM中
                  option.value === currentValue,
              })}
              label={option.label}
              value={option.value}
              disabled={!!option.disabled}
              checked={option.value === currentValue}
              key={option.value}
              onChange={(e, op) => {
                setCurrentValue(op.value);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
