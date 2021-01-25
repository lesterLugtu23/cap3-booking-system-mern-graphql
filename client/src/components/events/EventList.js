import React from 'react'
import EventRow from './EventRow'

const EventList = (props) => {
    let eventRow
    if(props.events === undefined) {
        eventRow = <span>Loading...</span>
    } else {
        eventRow = props.events.map(event => {
            return <EventRow
                        key={event.id}
                        event={event}
                        deleteEvent={props.deleteEvent}
                        bookEvent={props.bookEvent}
                        role={props.role}
                    />
        })
    }


    return(
        <>
        <div class="row align-items-stretch program">
            <div class="col-12 border-top border-bottom py-5" data-aos="fade" data-aos-delay="200">
                <div class="row align-items-stretch">
                   {eventRow} 
                </div>
            </div>
        </div>
        </>
    )
}

export default EventList