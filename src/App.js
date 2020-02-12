import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-client'; //Harus menggunakan apollo client 
import {ApolloProvider} from 'react-apollo'; //Include provider apollo
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import {UploadImage} from './components/UploadImage';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

// const apolloCache = new InMemoryCache()

// const uploadLink = createUploadLink({
//   uri: 'http://localhost:8000/graphql'
// })

// const client = new ApolloClient({
//   cache: apolloCache,
//   link: uploadLink
// })

// const client =new ApolloClient({
//     uri: 'http://localhost:4000'
// })

const link = createUploadLink({ uri: "http://localhost:4000/graphql" }); //Set link untuk upload file

export const client = new ApolloClient({ //Menjalankan apollo client
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* <BookList/>
        <AddBook/> */}
        <UploadImage/>
      </div>
    </ApolloProvider>
  );
}

export default App;
