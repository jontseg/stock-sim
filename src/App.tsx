import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import StockList from './StockList';


function App() {

 
  return (
        
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <StockList/>
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
