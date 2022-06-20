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
  handlerKeyPress: (event: unknown) => void;
  handlerClickActive: (event: unknown, id: number) => void;
  handlerClickTake: (event: unknown, id: number) => void;
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
      handlerKeyPress,
      handlerClickActive,
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
          onKeyPress={handlerKeyPress}
          onClick={event => handlerClickActive(event, productsKey)}
          onContextMenu={event => handlerClickActive(event, productsKey)}
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
