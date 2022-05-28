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
    activeId: 1,
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

          if (activeId > 1) {
            // eslint-disable-next-line no-console
            console.log(products[activeId - 2]);

            // eslint-disable-next-line no-console
            console.log(products[activeId - 1]);

            // eslint-disable-next-line no-console
            console.log(products);

            const newProducts: Product[] = [];
            const newActiveId = activeId - 1;

            newProducts.push(...products.slice(0, activeId - 2));
            newProducts.push(products[activeId - 1]);
            newProducts.push(products[activeId - 2]);
            newProducts.push(...products.slice(activeId));

            this.setState((prevState) => ({
              ...prevState,
              products: newProducts,
              activeId: newActiveId,
            }));
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('move UP', this.state.activeId);

          this.setState(prevState => ({
            activeId: prevState.activeId > 2 ? prevState.activeId - 1 : 1,
          }));
        }

        break;

      case 's':
        if (isTakenPosition) {
          // eslint-disable-next-line no-console
          console.log('take & move DOWN');

          if (activeId < products.length) {
            // eslint-disable-next-line no-console
            console.log(products[activeId - 1]);

            // eslint-disable-next-line no-console
            console.log(products[activeId]);

            // eslint-disable-next-line no-console
            console.log(products);

            const newProducts = [];
            const newActiveId = activeId + 1;

            newProducts.push(...products.slice(0, activeId - 1));
            newProducts.push(products[activeId]);
            newProducts.push(products[activeId - 1]);
            newProducts.push(...products.slice(activeId + 1));

            this.setState({
              products: newProducts,
              activeId: newActiveId,
            });
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('move DOWN', this.state.activeId);

          this.setState(prevState => ({
            activeId: prevState.activeId < products.length
              ? prevState.activeId + 1
              : products.length,
          }));
        }

        // this.setState(prevState => ({
        //   activeId:
        //     prevState.activeId < this.props.products.length
        //       ? prevState.activeId + 1
        //       : this.props.products.length,
        // }));

        // // eslint-disable-next-line no-console
        // console.log('move down', this.state.activeId);
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

    const sortedProducts = [...this.state.products].sort((a, b) => a.id - b.id);

    this.setState(() => ({
      products: sortedProducts,
    }));
  };

  sortByColorHandler = () => {
    // eslint-disable-next-line no-console
    console.log('sort by color');

    const sortedProducts = [...this.state.products].sort((a, b) => a.color.localeCompare(b.color));

    this.setState(() => ({
      products: sortedProducts,
    }));
  };

  sortByNameHandler = () => {
    // eslint-disable-next-line no-console
    console.log('sort by name');

    this.setState((prevState) => ({
      products: [...prevState.products].sort((a, b) => a.name.localeCompare(b.name)),
    }));
  };

  clickActiveHandler = (event: any, id: number) => {
    this.setState(() => ({
      activeId: id,
      isTakenPosition: false,
    }));
  };

  clickTakeHandler = (event: any, id: number) => {
    event.preventDefault();

    if (this.state.activeId === id) {
      this.setState((prevState) => ({
        ...prevState,
        isTakenPosition: !prevState.isTakenPosition,
      }));
    } else {
      this.setState(() => ({
        activeId: id,
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
          {products[activeId - 1].name}
        </p>
        <p>
          current position:&nbsp;
          {activeId}
        </p>
        <p>
          is taken? &nbsp;
          {isTakenPosition ? 'taken' : 'no taken'}
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

        <ul className="ProductList">
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

        <Memocomponent
          products={this.state.products}
        />
      </>
    );
  }
}
