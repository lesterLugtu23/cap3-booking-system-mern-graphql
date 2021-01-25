import { gql } from 'apollo-boost'

const createEventMutation = gql`
    mutation(
        $title: String!,
        $description: String!,
        $price: Float!,
        $date: String!,
        # $userId: ID!
    ){
        createEvent(
            title: $title,
            description: $description,
            price: $price,
            date: $date,
            # userId: $userId
        ){
            title
            description
            price
            date
            # userId
        }
    }
`
const updateEventMutation = gql`
    mutation(
        $id: ID!,
        $title: String!,
        $description: String!,
        $price: Float!,
        $date: String!
    ){
        updateEvent(
            id: $id,
            title: $title,
            description: $description,
            price: $price,
            date: $date
        ){
            title
            description
            price
            date
        }
    }
`

const deleteEventMutation = gql`
    mutation($id: ID!){
        deleteEvent(id: $id){
            id
        }
    }
`

const createUserMutation = gql `
    mutation(
        $name: String!,
        $username: String!,
        $email: String!,
        $password: String!,
        # $userId: ID!
    ){
        createUser(
            name: $name,
            username: $username,
            email: $email,
            password: $password,
            # userId: $userId
        ){
            name
            username
            email
            password
            # userId
        }
    }
`

const loginMutation = gql`
    mutation(
        $email: String!, 
        $password: String!
    ){
        login(
            email: $email, 
            password: $password
        ){
            name
            role
            token
        }
    }
`

const bookEventMutation = gql`
    mutation(
        $eventId: ID!,
        $userId: ID!
    ){
        bookEvent(
            eventId: $eventId,
            userId: $userId
        ){
            id
            event{
                title
            }
            user{
                name
            }
        }
    }
`

const deleteBookingMutation = gql`
    mutation($id: ID!){
        deleteBooking(id: $id){
            id
        }
    }
`

export {
    createEventMutation,
    deleteEventMutation,
    updateEventMutation,
    createUserMutation,
    loginMutation,
    bookEventMutation,
    deleteBookingMutation
}