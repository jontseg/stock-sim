/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getStock = /* GraphQL */ `query GetStock($Date: String!, $StockSymbol: String!) {
  getStock(Date: $Date, StockSymbol: $StockSymbol) {
    Close
    Date
    High
    Low
    Open
    OpenInt
    StockSymbol
    Volume
    __typename
  }
}
` as GeneratedQuery<APITypes.GetStockQueryVariables, APITypes.GetStockQuery>;
export const listStocks = /* GraphQL */ `query ListStocks(
  $filter: TableStockFilterInput
  $limit: Int
  $nextToken: String
) {
  listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      Close
      Date
      High
      Low
      Open
      OpenInt
      StockSymbol
      Volume
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStocksQueryVariables,
  APITypes.ListStocksQuery
>;
