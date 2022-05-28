import React from 'react';
// import classNames from 'classnames';

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

export class ProductItem extends React.Component<Props> {
  buttonColorStyle = (
    id: number,
    activeId: number,
    isTakenPosition: boolean,
  ) => {
    if (id === activeId) {
      return isTakenPosition ? 'yellow' : 'grey';
    }

    return 'white';
  };

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
    // console.log('ProductItem', name);

    return (
      <div>
        <button
          type="button"
          onKeyPress={keyPressHandler}
          onClick={event => clickActiveHandler(event, id)}
          onContextMenu={event => clickTakeHandler(event, id)}
          style={
            {
              border: `2px solid ${color}`,
              borderRadius: '10px',
              backgroundColor: this.buttonColorStyle(id, activeId, isTakenPosition),
              width: '200px',
              margin: '2px',
            }
          }
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
