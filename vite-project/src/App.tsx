import { gql, useQuery } from "@apollo/client"
import "./App.css"
import { GET_REPOSITORY } from "./graphql/query"

function App() {
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        variables: {
            username: "facebook",
            repository: "react",
        },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default App
