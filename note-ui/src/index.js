import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { onError } from 'apollo-link-error'
import Notifications, { notify } from 'react-notify-toast'

import App from './App';

const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(( {message }) => {
        notify.show(message, 'error')
    })
})

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" })

const link = ApolloLink.from([
    errorLink,
    httpLink
])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Notifications />
        <App />
    </ApolloProvider>, 
    document.getElementById('root')
);