const db = require('mongoose');
console.log(process.env.CONNECTION_STRING)
db.connect(process.env.CONNECTION_STRING, 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

module.exports = db;