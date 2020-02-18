const Dev = require('../models/Dev_model');
const parseStringAsArray = require('../ultils/parseStringAsArray');


module.exports = {

    //buscar dev em uma raio
    async index(req, res) {
        const { latitude, longitude, techs } = req.query;
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })
        res.json({ devs });
    }
}