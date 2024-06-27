'use client';

import Link from 'next/link';
import { ProductProvider } from './context';
import ProductApps from './productApps';

export default function Page() {
  return (
    <ProductProvider>
      <div className="App">
        <ProductApps />
      </div>
    </ProductProvider>
  );
}
