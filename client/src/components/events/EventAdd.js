import React, { useState } from 'react'

const EventAdd = ({createEvent}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')

    const newEvent = {
        title,
        description,
        price: parseFloat(price),
        date
    }

    return(
        <>
        <div class="row">
        <div class="col-lg-4"><h4>Create An Event</h4></div>
        <div class="col-lg-6">
        <form onSubmit={e => createEvent(e, newEvent)} class="pd=3">
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
            <div class="row justify-content-center pb-3">
            <button class="btn btn-danger">
            Submit
            </button>

            </div>

        </form>
        </div>
        </div>

        </>
    )
}

export default EventAdd