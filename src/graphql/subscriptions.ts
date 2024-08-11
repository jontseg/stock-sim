/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateStock = /* GraphQL */ `subscription OnCreateStock(
  $Close: Float
  $Date: String
  $High: Float
  $Open: Float
  $StockSymbol: String
) {
  onCreateStock(
    Close: $Close
    Date: $Date
    High: $High
    Open: $Open
    StockSymbol: $StockSymbol
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStockSubscriptionVariables,
  APITypes.OnCreateStockSubscription
>;
export const onDeleteStock = /* GraphQL */ `subscription OnDeleteStock(
  $Close: Float
  $Date: String
  $High: Float
  $Open: Float
  $StockSymbol: String
) {
  onDeleteStock(
    Close: $Close
    Date: $Date
    High: $High
    Open: $Open
    StockSymbol: $StockSymbol
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStockSubscriptionVariables,
  APITypes.OnDeleteStockSubscription
>;
export const onUpdateStock = /* GraphQL */ `subscription OnUpdateStock(
  $Close: Float
  $Date: String
  $High: Float
  $Open: Float
  $StockSymbol: String
) {
  onUpdateStock(
    Close: $Close
    Date: $Date
    High: $High
    Open: $Open
    StockSymbol: $StockSymbol
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStockSubscriptionVariables,
  APITypes.OnUpdateStockSubscription
>;
