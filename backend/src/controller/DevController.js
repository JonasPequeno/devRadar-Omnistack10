const axios = require('axios');
const Dev = require('../models/Dev_model');

const parseStringAsArray = require('../ultils/parseStringAsArray');

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio, company } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                bio,
                company,
                avatar_url,
                techs: techsArray,
                location
            });
        }
        return res.status(201).json({ 'Dev Criado': dev });
    },

    async index(req, res) {
        const devs = await Dev.find();

        return res.status(200).json(devs);
    },
}