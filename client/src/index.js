// npm modules
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom'

// Apollo dependancies.....................
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'


//custom module
import Nav from './partials/Nav'
// import Contact from './components/contact/Contact'
import Home from './components/home/Home'
import EventPage from './components/events/EventPage'
import EventUpdatePage from './components/events/EventUpdatePage'
import BookingPage from './components/bookings/BookingPage'
import RegisterPage from './components/auth/RegisterPage'
import LoginPage from './components/auth/LoginPage'
import Footer from './partials/Footer'

// Apollo setup.

const httpLink = createHttpLink({
  uri: 'https://stormy-spire-68273.herokuapp.com/graphql'
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const token = localStorage.getItem('token')

  // Return the headers to the context so httpLink can read them.
  return {
      headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
      }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


// const client  = new ApolloClient({uri:'http://localhost:4000/graphql'})

// 
// const nodeServer = () => {
// 	return 'https://name-of-backend.herokuapp.com/'
// }

const Main = withRouter(({ location }) => {
  const [name, setName] = useState(localStorage.getItem('name'))
  const [role, setRole] = useState(localStorage.getItem('role'))
  const [token, setToken] = useState(localStorage.getItem('token'))

  const updateSession = () => {
    setName(localStorage.getItem('name'))
    setRole(localStorage.getItem('role'))
    setToken(localStorage.getItem('token'))
  }

  const currentUser = () => {
    return { name: name, role: role, token: token }
  }
  const Login = (props) => <LoginPage { ...props } token= { token } updateSession={ updateSession }/>
  const Event = (props) => <EventPage { ...props } currentUser={ currentUser } updateSession={ updateSession }/>
  const Booking = (props) => <BookingPage { ...props } currentUser={ currentUser } updateSession={ updateSession } />
  const Logout = (props) => {
    localStorage.clear()
    updateSession()
    return <Redirect to='/login'/>
  }

//   return(
//   <>
//     <ApolloProvider client={client}>
//       <BrowserRouter>
//       <div class="site-wrap">
//         <Nav name={ name } role= { role } />
//         <Switch>
//           <Route exact path="/register" component={RegisterPage} />
//           <Route exact path="/login" render={Login} />
//           <Route exact path="/logout" component={Logout} />
//           <Route exact path="/" component={Home} />
//           <Route exact path="/events" render={Event} />
//           <Route exact path="/bookings" render={Booking} />
//           <Route exact path="/event/update/:memberid" component={EventUpdatePage} />
//           <Route exact path="/contact" component={Contact} />
//         </Switch>
//         <Footer />
//       </div>
//       </BrowserRouter>
//     </ApolloProvider>
//   </>
// )
// }



// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )




return(
  <>
      <div class="site-wrap">
        <Nav name={ name } role= { role } />
        <Switch>
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" render={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
          <Route exact path="/events" render={Event} />
          <Route exact path="/bookings" render={Booking} />
          <Route exact path="/event/update/:id" component={EventUpdatePage} />
          {/* <Route exact path="/contact" component={Contact} /> */}
        </Switch>

        {
          location.pathname !== '/event/update/:id' && location.pathname !== '/login' && location.pathname !== '/register' && <Footer />
        }
        {/* <Footer /> */}
      </div>
  </>
)
})


const Root = () => (
  <ApolloProvider client={client}>
  <BrowserRouter>
    <Main/>
  </BrowserRouter>
  </ApolloProvider>
)

ReactDOM.render(<Root/>, document.getElementById('root'))

///////////////////////////////////////////////


// const Main = withRouter(({location}) => {

//     const [userId, setUserId] = useState(localStorage.getItem('userId'))
//     const [token, setToken] = useState(localStorage.getItem('token'))
//     const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'))

//     const updateSession = () => {
//       setUserId(localStorage.getItem('userId'))
//       setToken(localStorage.getItem('token'))
//       setTokenExpiration(localStorage.getItem('tokenExpiration'))
//     }

//     const currentUser = () => {
//       return { userId: userId, token: token, tokenExpiration: tokenExpiration }
//     }

//     const Login = (props) => <Login { ...props } token={ token } updateSession={ updateSession }/>
//     const EventPage = (props) => <EventPage { ...props } currentUser={ currentUser } updateSession={ updateSession }/>
//     const Logout = (props) => {
//       localStorage.clear()
//       updateSession()
//       return <Redirect to='/login'/>
//     }
//   return(
//     <div>
//       <Nav />
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/signup" component={Signup} />
//         <Route exact path="/login" render={Login} />
//         <Route exact path="/events" component={EventPage} />
//         <Route exact path="/event/update/:memberid" component={EventUpdatePage} />
//       </Switch>
//       {
//         location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />
//       }
//     </div>
//   )
// })

// const Root = () => (
//   <ApolloProvider client={client}>
//   <BrowserRouter>
//     <Main/>
//   </BrowserRouter>
//   </ApolloProvider>
// )

// ReactDOM.render(<Root/>, document.getElementById('root'))
