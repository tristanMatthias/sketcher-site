import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
// import { ApolloLink } from 'apollo-link';

import { API_HOST } from '../config';

const cache = new InMemoryCache();

// const httpLink = createHttpLink({ uri: `${API_HOST}/graphql` });
const uploadLink = createUploadLink({
  uri: `${API_HOST}/graphql`,
  credentials: 'include'
});

// const middlewareLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     operation.setContext({
//       headers: {
//         authorization: `Bearer ${token}`
//       }
//     });
//   }
//   return forward(operation);
// });

// const link = middlewareLink.concat(httpLink).concat(uploadLink);
// const link = middlewareLink.concat(ApolloLink.from([httpLink, uploadLink]));


// const link = httpLink.concat(uploadLink);
//   uploadLink,
//   httpLink
// ]);

export const client = new ApolloClient({
  cache,
  link: uploadLink
});
