import React, { useEffect, useLayoutEffect } from 'react';
import CSSMotion from 'rc-motion';
import { SegmentedValue } from '.';

type ThumbReact = {
  left: number;
  right: number;
  width: number;
} | null;

interface ThumbProps {
  motionName: string;
  value: SegmentedValue;
  containerRef: React.RefObject<HTMLDivElement>;
  getValueIndex: (value: SegmentedValue) => number;
}

const toPX = (value: number) =>
  value !== undefined ? `${value}px` : undefined;

const calcThumbStyle = (
  targetElement: HTMLElement | null | undefined,
): ThumbReact =>
  targetElement
    ? {
        // targetElement 距离 container block 左边的距离
        left: targetElement.offsetLeft,
        // targetElement 距离 container block 右边的距离
        right:
          (targetElement.parentElement!.clientWidth as number) -
          targetElement.clientWidth -
          targetElement.offsetLeft,
        width: targetElement.clientWidth,
      }
    : null;

export function Thumb(props: ThumbProps) {
  //
  const { value, containerRef, motionName, getValueIndex } = props;
  //
  const [prevValue, setPrevValue] = React.useState(null);
  const [prevStyle, setPrevStyle] = React.useState<ThumbReact>(null);
  const [nextStyle, setNextStyle] = React.useState<ThumbReact>(null);
  //
  const findValueElement = (val: SegmentedValue) => {
    const index = getValueIndex(val);
    // 直接通过 querySelectorAll 获取 指定位置的item
    const ele =
      containerRef.current?.querySelectorAll<HTMLDivElement>(
        `.rc-segmented-item`,
      )[index];

    return ele?.offsetParent && ele;
  };

  useEffect(() => {
    //
    if (prevValue !== value) {
      //
      const prevEle = findValueElement(prevValue);
      const nextEle = findValueElement(value);
      //
      const preStyle = calcThumbStyle(prevEle);
      const nextStyle = calcThumbStyle(nextEle);
      console.log(containerRef);

      //
      setPrevStyle(preStyle);
      setNextStyle(nextStyle);
      setPrevValue(value);
    }
  }, [value]);
  //
  const thumbStart = React.useMemo(
    () => toPX(prevStyle?.left ?? 0),
    [prevStyle],
  );
  const thumbActive = React.useMemo(
    () => toPX(nextStyle?.left as number),
    [nextStyle],
  );
  console.log(thumbActive);

  // =========================== Motion ===========================
  const onAppearStart = () => {
    return {
      transform: `translateX(var(--thumb-start-left))`,
      width: `var(--thumb-start-width)`,
    };
  };
  const onAppearActive = () => {
    return {
      transform: `translateX(var(--thumb-active-left))`,
      width: `var(--thumb-active-width)`,
    };
  };
  const onVisibleChanged = () => {
    setPrevStyle(null);
    setNextStyle(null);
  };

  if (!prevStyle || !nextStyle) {
    return null;
  }

  return (
    <CSSMotion
      visible
      motionName={`rc-segmented-${motionName}`}
      motionAppear
      onAppearStart={onAppearStart}
      onAppearActive={onAppearActive}
      onVisibleChanged={onVisibleChanged}
    >
      {({ style: motionStyle, className }) => {
        const mergedStyle = {
          ...motionStyle,
          '--thumb-start-left': thumbStart,
          '--thumb-start-width': toPX(prevStyle?.width ?? 0),
          '--thumb-active-left': thumbActive,
          '--thumb-active-width': toPX(nextStyle?.width ?? 0),
        } as React.CSSProperties;

        return (
          <div
            className={`${className} rc-segmented-thumb`}
            style={mergedStyle}
          ></div>
        );
      }}
    </CSSMotion>
  );
}
