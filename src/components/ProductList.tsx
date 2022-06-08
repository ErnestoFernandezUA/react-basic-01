import React from 'react';
import './ProductList.scss';

import { ProductItem } from './ProductItem';
import { Product } from '../types/Product';
import { Memocomponent } from './Memocomponent';

type Props = {
  products: Product[];
};

type State = {
  products: Product[];
  activeId: number;
  isTakenPosition: boolean;
};

export class ProductList extends React.Component<Props, State> {
  state = {
    products: this.props.products,
    activeId: 0,
    isTakenPosition: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // eslint-disable-next-line no-console
    // console.log('nextProps', nextProps, 'nextState', nextState);

    // eslint-disable-next-line no-console
    console.log(nextProps.products !== this.props.products
      || nextState.activeId !== this.state.activeId
      || nextState.isTakenPosition !== this.state.isTakenPosition
      || nextState.products !== this.state.products ? 'shouldComponentUpdate true' : 'shouldComponentUpdate false');

    return nextProps.products !== this.props.products
      || nextState.activeId !== this.state.activeId
      || nextState.isTakenPosition !== this.state.isTakenPosition
      || nextState.products !== this.state.products;
  }

  keyPressHandler = (event: any) => {
    const {
      activeId,
      isTakenPosition,
      products,
    } = this.state;

    event.preventDefault();

    switch (event.key) {
      case 'w':
        if (isTakenPosition) {
          // eslint-disable-next-line no-console
          console.log('take & move UP');

          if (activeId > 0) {
            // eslint-disable-next-line no-console
            console.log(products[activeId - 1]);

            // eslint-disable-next-line no-console
            console.log(products[activeId]);

            // eslint-disable-next-line no-console
            console.log(products);

            const newProducts: Product[] = [];
            const newActiveId = activeId;

            newProducts.push(...products.slice(0, activeId - 1));
            newProducts.push(products[activeId]);
            newProducts.push(products[activeId - 1]);
            newProducts.push(...products.slice(activeId + 1));

            this.setState((prevState) => ({
              ...prevState,
              products: newProducts,
              activeId: newActiveId - 1,
            }));
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('move UP', this.state.activeId);

          this.setState(prevState => ({
            activeId: prevState.activeId > 1 ? prevState.activeId - 1 : 0,
          }));
        }

        break;

      case 's':
        if (isTakenPosition) {
          // eslint-disable-next-line no-console
          console.log('take & move DOWN');

          if (activeId < products.length - 1) {
            // eslint-disable-next-line no-console
            console.log(products[activeId - 1]);

            // eslint-disable-next-line no-console
            console.log(products[activeId]);

            // eslint-disable-next-line no-console
            console.log(products);

            const newProducts = [];
            const newActiveId = activeId + 1;

            newProducts.push(...products.slice(0, activeId));
            newProducts.push(products[activeId + 1]);
            newProducts.push(products[activeId]);
            newProducts.push(...products.slice(activeId + 2));

            this.setState({
              products: newProducts,
              activeId: newActiveId,
            });
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('move DOWN', this.state.activeId);

          this.setState(prevState => ({
            activeId: prevState.activeId < products.length - 1
              ? prevState.activeId + 1
              : products.length - 1,
          }));
        }

        break;

      case 't':
        this.setState(prevState => ({
          isTakenPosition: !prevState.isTakenPosition,
        }));

        // eslint-disable-next-line no-console
        console.log('take', this.state.isTakenPosition);
        break;

      default:
        break;
    }
  };

  sortByIdHandler = () => {
    // eslint-disable-next-line no-console
    console.log('sort by Id');

    const currentActiveProductId = this.state.products[this.state.activeId].id;

    // eslint-disable-next-line no-console
    console.log('currentActiveProductId = ', currentActiveProductId);

    const sortedProducts = [...this.state.products].sort((a, b) => a.id - b.id);
    const newActiveId = sortedProducts.findIndex(item => item.id === currentActiveProductId);

    // eslint-disable-next-line no-console
    console.log('newActiveId = ', newActiveId);

    this.setState(() => ({
      products: sortedProducts,
      activeId: newActiveId,
    }));
  };

  sortByColorHandler = () => {
    // eslint-disable-next-line no-console
    console.log('sort by color');

    const currentActiveProductId = this.state.products[this.state.activeId].id;

    // eslint-disable-next-line no-console
    console.log('currentActiveProductId = ', currentActiveProductId);

    const sortedProducts = [...this.state.products].sort((a, b) => a.color.localeCompare(b.color));

    const newActiveId = sortedProducts.findIndex(item => item.id === currentActiveProductId);

    // eslint-disable-next-line no-console
    console.log('newActiveId = ', newActiveId);

    this.setState(() => ({
      products: sortedProducts,
      activeId: newActiveId,
    }));
  };

  sortByNameHandler = () => {
    // eslint-disable-next-line no-console
    console.log('sort by name');

    const currentActiveProductId = this.state.products[this.state.activeId].id;

    // eslint-disable-next-line no-console
    console.log('currentActiveProductId = ', currentActiveProductId);

    const sortedProducts = [...this.state.products].sort((a, b) => a.name.localeCompare(b.name));

    const newActiveId = sortedProducts.findIndex(item => item.id === currentActiveProductId);

    // eslint-disable-next-line no-console
    console.log('newActiveId = ', newActiveId);

    this.setState(() => ({
      products: sortedProducts,
      activeId: newActiveId,
    }));
  };

  clickActiveHandler = (event: any, productsKey: number) => {
    this.setState(() => ({
      activeId: productsKey,
      isTakenPosition: false,
    }));
  };

  clickTakeHandler = (event: any, productsKey: number) => {
    event.preventDefault();

    if (this.state.activeId === productsKey) {
      this.setState((prevState) => ({
        ...prevState,
        isTakenPosition: !prevState.isTakenPosition,
      }));
    } else {
      this.setState(() => ({
        activeId: productsKey,
        isTakenPosition: true,
      }));
    }
  };

  render() {
    const {
      activeId,
      isTakenPosition,
      products,
    } = this.state;

    // eslint-disable-next-line no-console
    console.log('render ProductList');

    return (
      <>
        <p>
          name: &nbsp;
          {products[activeId].name}
        </p>
        <p>
          activeId:&nbsp;
          {activeId}
        </p>
        <p>
          isTakenPosition &nbsp;
          {isTakenPosition ? 'true' : 'false'}
        </p>

        <button
          type="button"
          onClick={this.sortByIdHandler}
          style={
            {
              border: '2px solid black',
              borderRadius: '10px',
              width: '200px',
              margin: '2px',
            }
          }
        >
          sort by id
        </button>
        <br></br>
        <button
          type="button"
          onClick={this.sortByColorHandler}
          style={
            {
              border: '2px solid black',
              borderRadius: '10px',
              width: '200px',
              margin: '2px',
            }
          }
        >
          sort by color
        </button>
        <br></br>
        <button
          type="button"
          onClick={this.sortByNameHandler}
          style={
            {
              border: '2px solid black',
              borderRadius: '10px',
              width: '200px',
              margin: '2px',
            }
          }
        >
          sort by name
        </button>

        <div className="productFlexBox">
          <ul className="productFlexBox__ProductList ProductList">
            {products.map((product, i) => {
              return (
                <li
                  key={product.id}
                >
                  <ProductItem
                    productsKey={i}
                    id={product.id}
                    name={product.name}
                    color={product.color}
                    activeId={activeId}
                    isTakenPosition={isTakenPosition}
                    keyPressHandler={this.keyPressHandler}
                    clickActiveHandler={this.clickActiveHandler}
                    clickTakeHandler={this.clickTakeHandler}
                  />
                </li>
              );
            })}
          </ul>
          <div className="productFlexBox__MemoComponent">
            <Memocomponent
              products={this.state.products}
            />
          </div>
        </div>
      </>
    );
  }
}
