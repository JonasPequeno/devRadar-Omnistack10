const { Router } = require('express');
const routes = Router();

const devController = require('./controller/DevController');
const searchController = require('./controller/SearchController');

routes.get('/', (req, res) => {
    return res.status(200).json({ rodando: "Servidor rodando!" });
})

routes.post('/devs', devController.store);
routes.get('/devs', devController.index);

routes.get('/search', searchController.index);


module.exports = routes;