import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import "./App.css"
import { useRootStore } from "./mst/models/stores/RepositoriesStore"
import { IRepositoryModel } from "./mst/models/stores/types/Interfaces"
import { Button } from "./ui/Button"

export const App = observer(() => {
    const { fetchTopRepositories, repositories, isLoading, error } =
        useRootStore()

    useEffect(() => {
        fetchTopRepositories(5)
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error Message is : {error}</p>

    return (
        <>
            <div>
                {repositories.map((repository: IRepositoryModel) => (
                    <div key={repository.id}>
                        <p>Id: {repository.id}</p>
                        <p>Name: {repository?.name}</p>
                        <p>Description: {repository?.description}</p>
                        <p>Url: {repository.url}</p>
                        <p>Stargazers: {repository.stargazers}</p>
                        <p>Forks: {repository.forks}</p>
                        <p>primaryLanguage: {repository.primaryLanguage}</p>
                        <p></p>
                        <br />
                    </div>
                ))}
            </div>
            <Button />
        </>
    )
})
