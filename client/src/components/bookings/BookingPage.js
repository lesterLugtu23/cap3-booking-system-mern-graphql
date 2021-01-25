// vendor libraries
import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import flowright from 'lodash.flowright'
import Swal from 'sweetalert2'


// custom modules
import BookingList from './BookingList'
import { getSpecificUserEventsQuery } from '../../graphql/queries'
import { deleteBookingMutation } from '../../graphql/mutations'

const BookingPage = (props) => {

    const data = props.data.user
    console.log(data)
// console.log(props)
    // if(props.data.loading === false){
    //     const data = props.data.user.Bookings
    //     console.log(data)
    // }

    const cancelBooking = id => {
        props.deleteBookingMutation({
            variables: {id: id},
            // refetchQueries: [{query: getSpecificUserEventsQuery}]
        }).then(response => {
            // console.log(response)
            window.location.reload(false)
        })
    }

    return(
        <>
        <div class="site-section">
        <div class="container">

            <div class="row mb-5">
                <div class="col-lg-4" data-aos="fade-up">
                    <div class="site-section-heading">
                        <h2>Programs</h2>
                    </div>
                </div>
            </div>

            <div class="row align-items-stretch program">
                <div class="col-12 border-top border-bottom py-5" data-aos="fade" data-aos-delay="200">
                    <div class="row">
                        <div class="col-md-3"><h4>Date</h4></div>
                        <div class="col-md-5"><h4>Title</h4></div>
                        <div class="col-md-2"><h4>Price</h4></div>
                        <div class="col-md-2"><h4 style={{textAlign: "center"}}>Action</h4></div>
                    </div>
                    <div class="row align-items-stretch">
                    <BookingList data={data} cancelBooking={cancelBooking}/>
                    </div>
                </div>
            </div>       
        </div>
        </div>
        </>
    )
}

export default flowright(
    graphql(getSpecificUserEventsQuery,
        {
            options: (props) => {
                // console.log(props.currentUser())
                let token = props.currentUser().token
                // console.log(token)

                const jwtParse = token => {
                if (!token) { return; }
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(window.atob(base64));
                }
                const userId = jwtParse(token)._id
                // console.log(userId)
                return {
                    variables: {
                        id: userId
                    }
                }
            }
        },
        {name: 'getSpecificUserEventsQuery'}),
    graphql(deleteBookingMutation, {name: 'deleteBookingMutation'})
)(BookingPage)