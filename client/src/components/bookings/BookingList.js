import React from 'react'

import BookingRow from './BookingRow'

const BookingList = (props) => {
    // console.log(props)

    let bookingRow
    if(props.data !== undefined){
        bookingRow = props.data.Bookings.map(event =>{
            return <BookingRow
                        key={event.id}
                        event={event}
                        cancelBooking={props.cancelBooking}
                    />
        })
    }
    return(
        <>
        {
            bookingRow
        }

        </>
    )
}

export default BookingList