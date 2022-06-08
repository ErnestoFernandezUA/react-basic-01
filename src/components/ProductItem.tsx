import React from 'react';
import './ProductItem.scss';
import classNames from 'classnames';

type Props = {
  productsKey: number;
  id: number;
  name: string;
  color: string;
  activeId: number;
  isTakenPosition: boolean;
  keyPressHandler: (event: any) => void;
  clickActiveHandler: (event: any, id: number) => void;
  clickTakeHandler: (event: any, id: number) => void;
};

export class ProductItem extends React.PureComponent<Props> {
  render() {
    const {
      productsKey,
      id,
      color,
      name,
      activeId,
      isTakenPosition,
      keyPressHandler,
      clickActiveHandler,
      clickTakeHandler,
    } = this.props;

    // eslint-disable-next-line no-console
    console.log('ProductItem', name, color);

    const buttonStyle = {
      border: `2px solid ${color}`,
    };

    return (
      <div>
        <button
          type="button"
          onKeyPress={keyPressHandler}
          onClick={event => clickActiveHandler(event, productsKey)}
          onContextMenu={event => clickTakeHandler(event, productsKey)}
          className={classNames(
            'ProductItem',
            { 'ProductItem--active': productsKey === activeId && !isTakenPosition },
            { 'ProductItem--taken': productsKey === activeId && isTakenPosition },
          )}
          style={buttonStyle}
        >
          {productsKey}
          &nbsp;
          {name}
          &nbsp;
          {color}
          &nbsp;
          {id}
        </button>
      </div>
    );
  }
}
