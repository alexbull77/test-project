import { gql } from "@apollo/client"

export const GET_REPOSITORY = gql`
    query getRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            name
            description
            primaryLanguage {
                name
            }
        }
    }
`

export const GET_REPOSITORIES = gql`
    query getRepositories($count: Int!) {
        viewer {
            repositories(first: $count) {
                nodes {
                    name
                    createdAt
                    description
                    owner {
                        login
                    }
                }
            }
        }
    }
`

export const GET_TOP_REPOSITORIES = gql`
    query getTopRepositories($count: Int!) {
        search(query: "stars:>1", type: REPOSITORY, first: $count) {
            repositoryCount
            edges {
                node {
                    ... on Repository {
                        name
                        description
                        url
                        stargazers {
                            totalCount
                        }
                        forks {
                            totalCount
                        }
                        primaryLanguage {
                            name
                        }
                    }
                }
            }
        }
    }
`
