import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";
import outputs from "../amplify_outputs.json";
import App from "./App.tsx";
import "./index.css";

Amplify.configure(outputs);
// Amplify.configure({
//   API: {
//     GraphQL: {
//       endpoint: 'https://7kkdnsp3pfhcbm76da5kf2h2na.appsync-api.us-west-1.amazonaws.com/graphql',
//       region: 'us-west-1',
//       defaultAuthMode: 'apiKey',
//       apiKey: 'da2-czzafpu5xredplaww57cveyhde'
//     }
//   }
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
