/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getStock = /* GraphQL */ `query GetStock($StockSymbol: String!, $Date: String!) {
  getStock(StockSymbol: $StockSymbol, Date: $Date) {
    Date
    StockSymbol
    Open
    Close
    High
    Low
    Volume
    OpenInt
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
      Date
      StockSymbol
      Open
      Close
      High
      Low
      Volume
      OpenInt
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
