// lib/shopify/queries.ts
import { gql } from "graphql-request";

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          options(first: 10) {
            name
            optionValues {
              name
            }
          }
          collections(first: 1) {
            edges {
              node {
                title
                handle
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = gql`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      options(first: 10) {
        name
        optionValues {
          name
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
      collections(first: 1) {
        edges {
          node {
            title
            handle
          }
        }
      }
      colorGalleries: metafield(namespace: "custom", key: "color_galleries") {
        references(first: 20) {
          edges {
            node {
              ... on Metaobject {
                colorName: field(key: "color_name") {
                  value
                }
                images: field(key: "images") {
                  references(first: 20) {
                    edges {
                      node {
                        ... on MediaImage {
                          image {
                            url
                            altText
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      metafields(
        identifiers: [
          { namespace: "custom", key: "material" }
          { namespace: "custom", key: "care_instructions" }
          { namespace: "custom", key: "sleeve" }
          { namespace: "custom", key: "collar" }
          { namespace: "custom", key: "fit" }
          { namespace: "custom", key: "branding_method" }
          { namespace: "custom", key: "ideal_for" }
          { namespace: "custom", key: "key_features" }
        ]
      ) {
        namespace
        key
        value
        type
      }
    }
  }
`;

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_CART_LINES_MUTATION = gql`
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_CART_QUERY = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                image {
                  url
                  altText
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_CART_LINES_MUTATION = gql`
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINES_MUTATION = gql`
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    url
                    altText
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
