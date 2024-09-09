const bodyParser = require('body-parser')

const user = require('./userRoute')

const auth = require('./authRoute')
const role = require('./role')
const permission = require('./permission')
const security = require('./security')

module.exports = app =>{
    app.use(
        bodyParser.json(),
        auth,
        user,
        role,
        permission,
        security
    )
}