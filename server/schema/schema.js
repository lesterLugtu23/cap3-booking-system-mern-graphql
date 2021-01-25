// vendor libraries
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql
const GraphQLDate = require('graphql-date')
const bcrypt = require('bcryptjs')


// custom libraries
const User = require('../models/user')
const Event = require('../models/event')
const Booking = require('../models/booking')
const auth = require('../jwt-auth')


// Creating object types
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        role: {type: GraphQLString},
        token: {type: GraphQLString},
        Events: {
            type: new GraphQLList(EventType),
            resolve: (parent, args) => {
                return Event.find({ creatorId: parent.id })
            }
        },
        Bookings: {
            type: new GraphQLList(BookingType),
            resolve: (parent, args) => {
                return Booking.find({userId: parent.id})
            }
        },
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate}
    })
})

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        price: {type: GraphQLFloat},
        date: {type: GraphQLDate},
        creator: {
            type: UserType,
            resolve: (parent, args) => {
                return User.findById(parent.creatorId)
            }
        },
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate}
    })
})

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => ({
        id: {type: GraphQLID},
        event: {
            type: EventType,
            resolve: (parent, args) => {
                return Event.findById(parent.eventId)
            }
        },
        user: {
            type: UserType,
            resolve: (parent, args) => {
                return User.findById(parent.userId)
            }
        },
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate}
    })
})

// Creating Query type
const RootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return User.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return User.find({})
            }
        },
        event: {
            type: EventType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return Event.findById(args.id)
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve: (parent, args) => {
                return Event.find(({}))
            }
        },
        booking: {
            type: BookingType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                return Booking.findById(args.id)
            }
        },
        bookings: {
            type: new GraphQLList(BookingType),
            resolve: (parent, args) => {
                return Booking.find({})
            }
        },
    }
})

// Creating Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                username: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, args) {
                return await User.findOne({ email: args.email })
                    .then(user => {
                        if(user) {
                            throw new Error('Email exists.')
                        }
                        return bcrypt.hash(args.password, 8)
                    })
                    .then(hashedPassword => {
                        let user = new User({
                            name: args.name,
                            username: args.username,
                            email: args.email,
                            password: hashedPassword,
                            role: "0"
                        })
                        return user.save()
                    })
                    .then(result => {
                        return {
                            ...result._doc,
                            password: null,
                            id: result.id
                        }
                    })
            }
        },
        updateUser: {
			type: UserType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)},
				name: {type: new GraphQLNonNull(GraphQLString)},
				email:{type: new GraphQLNonNull(GraphQLString)},
				username:{type: new GraphQLNonNull(GraphQLString)},
				password:{type: new GraphQLNonNull(GraphQLString)},
			},
			resolve: (parent, args)=>{
				let userId = {_id: args.id}
				let updates = {
					name: args.name,
					email: args.email,
					username: args.username,
					password: args.password,
				} 
				return User.findOneAndUpdate(userId, updates)
			}
		},
        deleteUser: {
			type: UserType,
			args: {
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve: (parent, args)=>{
				let userId = {_id: args.id}
				return User.findOneAndDelete(userId)
			}
		},
        login: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                let query = User.findOne({ email: args.email })

                return query.then((user) => user).then((user) => {
                    if (user == null) { return null }

                        let isPasswordMatched = bcrypt.compareSync(args.password, user.password)

                        if (isPasswordMatched) {
                            user.token = auth.createToken(user.toObject())
                            return user
                        } else {
                            return null
                        }
                })
            }
        },
        createEvent: {
            type: EventType,
            args: {
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                price: {type: GraphQLFloat},
                date: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve: (parent, args) => {
                console.log(args.userId)
                let event = new Event({
                    title: args.title,
                    description: args.description,
                    price: args.price,
                    date: args.date,
                    // creatorId: args.userId
                })
                return event.save()
            }
        },
        updateEvent: {
            type: EventType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: new GraphQLNonNull(GraphQLFloat)},
                date: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                return Event.findOneAndUpdate(
                    {_id: args.id},
                    {title: args.title,
                    description: args.description,
                    price: args.price,
                    date: args.date},
                    {new: true},
                    event => event
                )
            }
        },
        deleteEvent: {
            type: EventType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                return Event.findOneAndDelete({_id: args.id})
            }
        },
        bookEvent: {
            type: BookingType,
            args: {
                eventId: {type: new GraphQLNonNull(GraphQLID)},
                userId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                let booking = new Booking({
                    eventId: args.eventId,
                    userId: args.userId
                })
                return booking.save()
            }
        },
        deleteBooking: {
            type: BookingType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve: (parent, args) => {
                return Booking.findOneAndDelete({ _id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})
