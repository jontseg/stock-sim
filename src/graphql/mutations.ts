/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createStock = /* GraphQL */ `mutation CreateStock($input: CreateStockInput!) {
  createStock(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateStockMutationVariables,
  APITypes.CreateStockMutation
>;
export const updateStock = /* GraphQL */ `mutation UpdateStock($input: UpdateStockInput!) {
  updateStock(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateStockMutationVariables,
  APITypes.UpdateStockMutation
>;
export const deleteStock = /* GraphQL */ `mutation DeleteStock($input: DeleteStockInput!) {
  deleteStock(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteStockMutationVariables,
  APITypes.DeleteStockMutation
>;
