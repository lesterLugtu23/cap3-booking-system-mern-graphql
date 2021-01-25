import React from 'react'
import { Link } from 'react-router-dom'

const EventRow = ({event: {id, title, description, price, date}, deleteEvent, bookEvent, role}) => {

    let showUpdateAndDeleteButton = (
        <div class="col-md-2">
            <Link to={"/event/update/" + id}>
                <button className="btn btn-primary mr-4">Update</button>
            </Link>
            <button class="btn btn-danger" onClick={() => deleteEvent(id)}>Remove</button>
        </div>
    )

    let showBookEventButton = (
        <button class="btn btn-danger  mb-4" onClick={() => bookEvent(id)}>Book this event</button>
    )

    return(
        <>
        <div class="col-md-4 text-white mb-3 mb-md-0"><span class="h4">{new Date(date).toLocaleDateString()}</span> <span>8:00 AM</span></div>
        <div class="col-md-6">
            <h2 style={{color: "#a84032"}}>{title}</h2>
            <h5>{description}</h5>
            <p class="">
                <span>Price </span>
                <span class="price">{price}<small> USD</small></span>
            </p>
                {
                    (role !== 'admin') ? showBookEventButton : null
                }
        </div>
        {
            (role === "admin") ? showUpdateAndDeleteButton : null
        }
        </>
    )
}

export default EventRow