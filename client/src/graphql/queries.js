import { gql } from 'apollo-boost'

const getEventsQuery = gql`
    {
        events{
            id
            title
            description
            price
            date
        }
    }
`

const getEventQuery = gql`
    query($id: ID!){
        event(id: $id){
            id
            title
            description
            price
            date
        }
    }
`

const getSpecificUserEventsQuery = gql `
    query($id: ID!){
        user(id: $id){
            Bookings{
                id
                event{
                    date
                    title
                    price
                }
            }
        }
    }
`

export {
    getEventsQuery,
    getEventQuery,
    getSpecificUserEventsQuery
}