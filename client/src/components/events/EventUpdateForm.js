import React, { useState } from 'react'
import './shit.css'

const EventUpdateForm = ({updateEvent, event}) => {

    const [title, setTitle] = useState(event.title)
    const [description, setDescription] = useState(event.description)
    const [price, setPrice] = useState(event.price)
    const [date, setDate] = useState(event.date)

    const updatedEvent = {
        id: event.id,
        title,
        description,
        price: parseFloat(price),
        date
    }

    return(
        <>
        <div class="login-box">
        <h2>Create An Event</h2>
        <form onSubmit={e => updateEvent(e, updatedEvent)}>
            <div class="user-box">
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" />
            <label>Title</label>
            </div>
            <div class="user-box">
            <input value={description} onChange={e => setDescription(e.target.value)} type="text" />
            <label>Description</label>
            </div>
            <div class="user-box">
            <input value={price} onChange={e => setPrice(e.target.value)} type="text" name="" required="" />
            <label>Price</label>
            </div>
            <div class="user-box">
            <input value={date} onChange={e => setDate(e.target.value)} type="text" name="" required="" />
            <label>Date</label>
            </div>
            <button>
            <span></span>
            <span></span>
            Submit
            </button>
        </form>
        </div>

        </>
    )
}

export default EventUpdateForm