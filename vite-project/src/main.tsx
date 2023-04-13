import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    gql,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// need to fix this so it reads from .env file
window.process = {
    env: {
        REACT_APP_GITHUB_TOKEN: "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",
    },
}

// Create the http link
const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
})

// Generate and set the header with the auth details
const authLink = setContext((_, { headers }) => {
    // get the authentication token from env variables if it exists
    const token = process.env.REACT_APP_GITHUB_TOKEN

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    }
})

// Generate your client with the authLink and httpLink
export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
)
