// vendor libraries
import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import flowright from 'lodash.flowright'
import Swal from 'sweetalert2'


// custom modules
import EventAdd from './EventAdd'
import EventList from './EventList'
import { getEventsQuery } from '../../graphql/queries'
import { createEventMutation, deleteEventMutation, bookEventMutation } from '../../graphql/mutations'

const EventPage = (props) => {

    let role = props.currentUser().role
    let token = props.currentUser().token

    const jwtParse = token => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    const data = props.getEventsQuery
    const [showForm, setShowForm] = useState(false)
    let button
    
    if(showForm){
        button = {
            style: "btn btn-danger mt-3",
            name: "hide"
        }
    } else {
        button = {
            style: "btn btn-primary mt-3",
            name: "create an event"
        }
    }
    
    const createEvent = (e, newEvent) => {
        e.preventDefault()
        //  const userId = jwtParse(token)._id
// console.log(userId)
        // newEvent.userId = userId
// console.log(newEvent)
        props.createEventMutation({
            variables: newEvent,
            refetchQueries: [{query: getEventsQuery}]
        })
    }

    let showCreateEventForm = (
        <>
        <div class="row mb-5">
            <button
                class={button.style}
                onClick={() => setShowForm(!showForm)}
            >
                {button.name}
            </button>
            </div>
        <div class="row">
            {showForm ? <EventAdd createEvent={createEvent} /> : null}
        </div>
        </>
    )

    const deleteEvent = id => {
        props.deleteEventMutation({
            variables: {id: id},
            refetchQueries: [{query: getEventsQuery}]
        })
    }


    const bookEvent = (id, userId) => {
        userId = jwtParse(token)._id

        // alert(id)
        props.bookEventMutation({
            variables: {
                eventId: id,
                userId: userId
            },
            refetchQueries: [{query: getEventsQuery}]
        })
        .then((response) => {
            // console.log(response)
            if (response.data !== null ) {
                Swal.fire({
                    title: 'Booking Transaction',
                    text: 'You have successfully added the event to your booking list.',
                    type: 'success'
                })
            } else {
                Swal.fire({
                    title: 'Booking Failed',
                    text: 'Something went wrong, please try again.',
                    type: 'error'
                })
            }
        })
    }

    return(
        <>
        <div class="site-section site-hero inner">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-10">
                        <span class="d-block mb-3 caption" data-aos="fade-up">Our Speakers</span>
                        <h1 class="d-block mb-4" data-aos="fade-up" data-aos-delay="100">Events</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="site-section">
        <div class="container">

            <div class="row align-items-center speaker">
                <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
                    <img src={process.env.PUBLIC_URL + '/images/person_1.jpg'} alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-6 ml-auto">
                    <h2 class="text-white mb-4 name" data-aos="fade-right" data-aos-delay="200">Emely Peters</h2>
                    <div class="bio pl-lg-5">
                        <span class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Web Designer</span>
                        <p class="mb-4" data-aos="fade-right" data-aos-delay="400">Emily Peters is a UK-based designer specialising in web/UI design, graphic design, branding, illustration and photography. With a worldwide client roster, her work is regularly featured in design-related publications and she’s a regular speaker at design and tech conferences.</p>
                        <p data-aos="fade-right" data-aos-delay="500">
                            Follow Emely &mdash;
                            <a href="#" class="p-2"><span class="icon-facebook"></span></a>
                            <a href="#" class="p-2"><span class="icon-twitter"></span></a>
                            <a href="#" class="p-2"><span class="icon-github"></span></a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="row align-items-center speaker">
                <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
                    <img src={process.env.PUBLIC_URL + '/images/person_2.jpg'} alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-6 ml-auto order-lg-1">
                    <h2 class="text-white mb-4 name" data-aos="fade-left" data-aos-delay="200">Alex Anchor</h2>
                    <div class="bio pr-lg-5">
                        <span class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">Web Designer</span>
                        <p class="mb-4" data-aos="fade-left" data-aos-delay="400">Alex Anchor is a freelance creative director, designer and frontend developer living in Southern California. He’s designed, developed or animated six Adobe Sites of the Day, two Awwwards, 36 FWA Sites of the Day, four FWA Mobile Sites of the day, two FWA Sites of the Month and three Adobe Cutting Edge Awards.</p>
                        <p data-aos="fade-left" data-aos-delay="500">
                            Follow Alex &mdash;
                            <a href="#" class="p-2"><span class="icon-facebook"></span></a>
                            <a href="#" class="p-2"><span class="icon-twitter"></span></a>
                            <a href="#" class="p-2"><span class="icon-github"></span></a>
                        </p>
                    </div>
                </div>
            </div>

            <div class="row align-items-center speaker">
                <div class="col-lg-6 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
                    <img src={process.env.PUBLIC_URL + '/images/person_3.jpg'} alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-6 ml-auto">
                    <h2 class="text-white mb-4 name" data-aos="fade-right" data-aos-delay="200">Aaron Thomas</h2>
                    <div class="bio pl-lg-5">
                        <span class="text-uppercase text-primary d-block mb-3" data-aos="fade-right" data-aos-delay="300">Nodejs expert</span>
                        <p class="mb-4" data-aos="fade-right" data-aos-delay="400">A developer and entrepreneur based in Brooklyn NY, Aaron Thomas provides web development services to a variety of clients, from Fortune 500 companies to small startups. Until recently, he was the design lead at Twitter New York.</p>
                        <p data-aos="fade-right" data-aos-delay="500">
                            Follow Aaron &mdash;
                            <a href="#" class="p-2"><span class="icon-facebook"></span></a>
                            <a href="#" class="p-2"><span class="icon-twitter"></span></a>
                            <a href="#" class="p-2"><span class="icon-github"></span></a>
                        </p>
                    </div>
                </div>
            </div>

      
            <div class="row align-items-center speaker">
                <div class="col-lg-6 mb-5 mb-lg-0 order-lg-2" data-aos="fade" data-aos-delay="100">
                    <img src={process.env.PUBLIC_URL + '/images/person_4.jpg'} alt="Image" class="img-fluid" />
                </div>
                <div class="col-lg-6 ml-auto order-lg-1">
                    <h2 class="text-white mb-4 name" data-aos="fade-left" data-aos-delay="200">Chris Mathews</h2>
                    <div class="bio pr-lg-5">
                        <span class="text-uppercase text-primary d-block mb-3" data-aos="fade-left" data-aos-delay="300">GraphQL Lover</span>
                        <p class="mb-4" data-aos="fade-left" data-aos-delay="400">Chris Mathews is a designer and community builder, with a passion for design systems and minimalism. At Salesforce, he is lead developer on the Lightning Design System. He also organises Clarity, the first Design Systems conference; started the Design Systems Coaltion and its SF chapter;</p>
                        <p data-aos="fade-left" data-aos-delay="500">
                            Follow Chris &mdash;
                            <a href="#" class="p-2"><span class="icon-facebook"></span></a>
                            <a href="#" class="p-2"><span class="icon-twitter"></span></a>
                            <a href="#" class="p-2"><span class="icon-github"></span></a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>

        <div class="site-section">
        <div class="container">

            <div class="row mb-5">
            <div class="col-lg-4" data-aos="fade-up">
                <div class="site-section-heading">
                    <h2>Programs</h2>
                </div>
            </div>
            <div class="col-lg-8 mt-5 pl-lg-5" data-aos="fade-up" data-aos-delay="100">
                <p>Conferences are about gathering information and knowledge but are also opportunities to meet and learn from other like-minded folks in the web design community. Plus, you’ll be exposed to a large amount of new information, which will help you to advance in your career.</p>
            </div>
            </div>
            <div>
            
            {
                (role === "admin") ? showCreateEventForm : null
            }
            </div>
            <div>
                <EventList events={data.events} deleteEvent={deleteEvent} bookEvent={bookEvent} role={role}/>
            </div>
        </div>
        </div>
        </>
    )
}

export default flowright(
    graphql(getEventsQuery, {name: 'getEventsQuery'}),
    graphql(createEventMutation, {name: 'createEventMutation'}),
    graphql(deleteEventMutation, {name: 'deleteEventMutation'}),
    graphql(bookEventMutation, {name: 'bookEventMutation'})
)(EventPage)