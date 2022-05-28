import React from 'react';
import { Product } from '../types/Product';

type Props = {
  products: Product[];
};

export const Memocomponent = React.memo<Props>(
  ({ products }) => {
    // eslint-disable-next-line no-console
    console.log('memo', products);

    return (
      <div>
        Memo
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
