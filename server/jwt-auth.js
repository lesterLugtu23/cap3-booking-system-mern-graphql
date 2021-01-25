const jwt = require('jsonwebtoken')
const secret = 'merng-csp3-guide'

/*This will create a token for a user*/
module.exports.createToken = (user) => {
    let data = {
        _id: user._id, 
        email: user.email, 
        role: user.role
    }
 
    return jwt.sign(data, secret, { expiresIn: '2h' })
}
module.exports.verify = (authToken) => {
    if (typeof authToken !== 'undefined') {
        authToken = authToken.slice(7, authToken.length)
        
        return jwt.verify(authToken, secret, (err, data) => {
            if (err) {
                return null
            } else {
                return jwt.decode(authToken, { complete: true }).payload
            }
        })
    } else {
        return null
    }
}

module.exports.getId = (authToken) => {
	getPayload(authToken)._id
}

getPayload = (authToken) => {
    return jwt.decode(authToken, { complete: true }).payload
}