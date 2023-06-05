interface Product {
  sku: string;
  name: string;
  price: number;
  productType: string;
  features: {
    size?: number;
    width?: number;
    height?: number;
    length?: number;
    weight?: number;
  };
}

export type { Product };
