import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import config from './aws-exports';
import StockChart from './StockChart';
import StockList from './StockList';

Amplify.configure(config);

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  }

 
  return (
        
    <Authenticator>
      {({ signOut }) => (
      <main>
        <button onClick={signOut}>Sign out</button>
        <StockChart/>
        <StockList onInputChange={handleSearchChange} searchTerm={searchTerm}/>
      </main>
        
      )}
      </Authenticator>
  );
}

export default App;
