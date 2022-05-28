import React from 'react';

import './App.scss';
import { ProductList } from './components/ProductList';
import productsFromServer from './data/data.json';
import { Product } from './types/Product';

type State = {
  products: Product[];
  age: number;
};

class App extends React.Component<{}, State> {
  state = {
    products: productsFromServer,
    age: 1,
  };

  addYear = () => {
    this.setState((prevState) => ({
      age: prevState.age + 1,
    }));
  };

  render() {
    // eslint-disable-next-line no-console
    console.log('render App');

    return (
      <div className="App">
        <h2>
          age:&nbsp;
          {this.state.age}
        </h2>
        <button
          type="button"
          onClick={this.addYear}
          style={
            {
              border: '2px solid black',
              borderRadius: '10px',
              width: '200px',
              margin: '2px',
            }
          }
        >
          Age ++
        </button>

        <ProductList products={this.state.products} />
      </div>
    );
  }
}

export default App;
