const axios = require('axios');

module.exports.basicGet = (req, res) => {
    console.log("basicGet: request...")
    console.log(req.body)
    axios.get(`https://ridb.recreation.gov/api/v1/recareas?limit=50&offset=0&full=true&latitude=${req.body.coords.lat}&longitude=${req.body.coords.lng}&radius=${req.body.mileRadius}&lastupdated=10-01-2018`, {headers : {apikey: process.env.REACT_APP_REC_KEY, accept: "application/json"}})
        .then(results => {
            // console.log(results.data)
            res.json({recareas: results.data});

        })
        .catch(err => console.log(err))
}

module.exports.singleGet = (req, res) => {
    console.log(req.body)
    axios.get('https://ridb.recreation.gov/api/v1/recareas/' + req.body.recId + '?full=true', {headers : {apikey: process.env.REACT_APP_REC_KEY, accept: "application/json"}})
        .then(results => res.json(results.data))
        .catch(err => console.log(err))
}