// vendor libraries
import React from 'react'
import flowright from 'lodash.flowright'
import { graphql } from 'react-apollo'


// custom module
import EventUpdateForm from './EventUpdateForm'
import { getEventQuery } from '../../graphql/queries'
import { updateEventMutation } from '../../graphql/mutations'

const EventUpdatePage = (props) => {
    const event = props.getEventQuery.event
    // console.log(event)
    const updateEvent = (e, updatedEvent) => {
        e.preventDefault()
        props.updateEventMutation({
            variables: updatedEvent,
        }).then(() => {
            window.location.href='/'
        })
    }

    let returnUpdateEventForm = <span>Loading...</span>
    if(event !== undefined) {
        returnUpdateEventForm = <EventUpdateForm event={event} updateEvent={updateEvent} />
    }

    return(
        <>
        {returnUpdateEventForm}
        </>
    )
}

export default flowright(
    graphql(getEventQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.match.params.id
                }
            }
        },
        name: 'getEventQuery'}),
    graphql(updateEventMutation, {name: 'updateEventMutation'})
)(EventUpdatePage)
