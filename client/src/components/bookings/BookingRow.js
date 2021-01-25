import React from 'react'


const BookingRow = (props) => {
    // console.log(props)
    const data = props.event
    // console.log(data)

    let showCancelButton = (
        <div class="col-md-2 btn-group">
            <button class="btn btn-danger mr-3 mt-2 mb-2 btn-sm" onClick={() => props.cancelBooking(data.id)}>Cancel</button>
            <button class="btn btn-danger mr-3 mt-2 mb-2 btn-sm">Checkout</button>

        </div>
    )
    return(
        <>
        <div class="col-md-3"><h5>{new Date(data.event.date).toLocaleDateString()}</h5></div>
        <div class="col-md-5"><h5>{data.event.title}</h5></div>
        <div class="col-md-2"><h5>{data.event.price}</h5></div>
        <div class="col-md-2">
        {
            showCancelButton
        }
        </div>
        </>
    )
}

export default BookingRow