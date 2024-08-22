/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateStock = /* GraphQL */ `subscription OnCreateStock(
  $Date: String
  $StockSymbol: String
  $Open: Float
  $Close: Float
  $High: Float
) {
  onCreateStock(
    Date: $Date
    StockSymbol: $StockSymbol
    Open: $Open
    Close: $Close
    High: $High
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStockSubscriptionVariables,
  APITypes.OnCreateStockSubscription
>;
export const onUpdateStock = /* GraphQL */ `subscription OnUpdateStock(
  $Date: String
  $StockSymbol: String
  $Open: Float
  $Close: Float
  $High: Float
) {
  onUpdateStock(
    Date: $Date
    StockSymbol: $StockSymbol
    Open: $Open
    Close: $Close
    High: $High
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStockSubscriptionVariables,
  APITypes.OnUpdateStockSubscription
>;
export const onDeleteStock = /* GraphQL */ `subscription OnDeleteStock(
  $Date: String
  $StockSymbol: String
  $Open: Float
  $Close: Float
  $High: Float
) {
  onDeleteStock(
    Date: $Date
    StockSymbol: $StockSymbol
    Open: $Open
    Close: $Close
    High: $High
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStockSubscriptionVariables,
  APITypes.OnDeleteStockSubscription
>;
