import React, { isValidElement, type ReactNode } from 'react';
import cls from 'classnames';
import { isObject, isString } from 'lodash';
import useDefaultProps from '../hooks/useDefaultProps';
import { emptyDefaultProps } from './defaultProps';
import { TdEmptyProps } from './type';
import Image from '../image';
import { StyledProps } from '../common';
import useConfig from '../hooks/useConfig';

import MaintenanceSvg from './assets/MaintenanceSvg';
import NetworkErrorSvg from './assets/NetworkErrorSvg';
import EmptySvg from './assets/EmptySvg';
import FailSvg from './assets/FailSvg';
import SuccessSvg from './assets/SuccessSvg';

export type EmptyProps = TdEmptyProps & StyledProps;

function getImageIns(data: EmptyProps['image']) {
  let result = data;
  if (isValidElement(data)) {
    result = data;
  } else if (isObject(data)) {
    result = <Image {...(data as any)} />;
  } else if (isString(data)) {
    result = <Image src={data} />;
  }

  return data ? (result as ReactNode) : null;
}

const defaultMaps: {
  [key in EmptyProps['type']]?: Pick<EmptyProps, 'image' | 'title'>;
} = {
  maintenance: {
    image: <MaintenanceSvg />,
    title: '建设中',
  },
  success: {
    image: <SuccessSvg />,
    title: '成功',
  },
  fail: {
    image: <FailSvg />,
    title: '失败',
  },
  'network-error': {
    image: <NetworkErrorSvg />,
    title: '网络错误',
  },
  empty: {
    image: <EmptySvg />,
    title: '暂无数据',
  },
};

const Empty = (props: EmptyProps) => {
  const {
    image: propsImage,
    imageStyle,
    description: propsDescription,
    title: propsTitle,
    type,
    action,
    style,
  } = useDefaultProps(props, emptyDefaultProps);
  const { classPrefix } = useConfig();

  const name = `${classPrefix}-empty`;
  const titleClasses = cls(`${name}__title`);
  const imageClasses = cls(`${name}__image`);
  const descriptionClasses = cls(`${name}__description`);
  const actionCls = cls(`${name}__action`);

  const typeImageProps = defaultMaps[type] ?? null;

  const { image, description, title } = {
    image: propsImage ? propsImage : typeImageProps?.image ?? null,
    title: propsTitle ? propsTitle : typeImageProps?.title ?? null,
    description: propsDescription,
  };

  function renderTitle() {
    if (!title) {
      return null;
    }
    return <div className={titleClasses}>{title}</div>;
  }

  function renderDescription() {
    if (!description) {
      return null;
    }
    return <div className={descriptionClasses}>{description}</div>;
  }

  const imageContent = getImageIns(image);

  return (
    <div className={name} style={style}>
      {imageContent ? (
        <div className={imageClasses} style={imageStyle}>
          {imageContent}
        </div>
      ) : null}
      {renderTitle()}
      {renderDescription()}
      {action ? <div className={actionCls}>{action}</div> : null}
    </div>
  );
};

export default Empty;
