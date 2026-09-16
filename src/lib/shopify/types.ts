export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyOption {
  name: string;
  optionValues: ShopifyOptionValue[];
}

export interface ShopifyCollection {
  title: string;
  handle: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  options: ShopifyOption[];
  collections: {
    edges: { node: ShopifyCollection }[];
  };
}

export interface ProductsResponse {
  products: {
    edges: { node: ShopifyProduct }[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface ShopifyMetafield {
  namespace: string;
  key: string;
  value: string;
  type: string;
}

export interface ShopifyProductDetail {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: {
    edges: { node: ShopifyImage }[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  options: ShopifyOption[];
  collections: {
    edges: { node: ShopifyCollection }[];
  };
  metafields: (ShopifyMetafield | null)[]; // Shopify returns null for any identifier that doesn't exist on that product
}

export interface ProductByHandleResponse {
  product: ShopifyProductDetail | null; // null if handle doesn't exist — handle this for 404s
}

export interface ShopifyOptionValue {
  name: string;
}

export interface ShopifyOption {
  name: string;
  optionValues: ShopifyOptionValue[];
}

export interface ShopifyVariant {
  id: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: ShopifyMoney;
}

export interface ShopifyMetaobjectImage {
  image: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
}

export interface ShopifyColorGallery {
  colorName: { value: string } | null;
  images: {
    references: {
      edges: { node: ShopifyMetaobjectImage }[];
    } | null;
  } | null;
}

export interface ShopifyProductDetail {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  options: ShopifyOption[];
  variants: { edges: { node: ShopifyVariant }[] };
  collections: { edges: { node: ShopifyCollection }[] };
  colorGalleries: {
    references: {
      edges: { node: ShopifyColorGallery }[];
    } | null;
  } | null;
  metafields: (ShopifyMetafield | null)[];
}

export interface ProductByHandleResponse {
  product: ShopifyProductDetail | null;
}

export interface CartUserError {
  field: string[] | null;
  message: string;
}

export interface CreateCartResponse {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: CartUserError[];
  };
}

export interface CartLineMerchandise {
  id: string;
  title: string;
  price: ShopifyMoney;
  image: { url: string; altText: string | null } | null;
  product: { title: string; handle: string };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: CartLineMerchandise;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { totalAmount: ShopifyMoney };
  lines: { edges: { node: CartLine }[] };
}

export interface CartMutationResponse {
  cartLinesAdd?: { cart: Cart | null; userErrors: CartUserError[] };
  cartLinesUpdate?: { cart: Cart | null; userErrors: CartUserError[] };
  cartLinesRemove?: { cart: Cart | null; userErrors: CartUserError[] };
  cartCreate?: { cart: Cart | null; userErrors: CartUserError[] };
}

export interface GetCartResponse {
  cart: Cart | null;
}

export interface ShopifyCollectionDetail {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
}

export interface CollectionsResponse {
  collections: {
    edges: { node: ShopifyCollectionDetail }[];
  };
}
