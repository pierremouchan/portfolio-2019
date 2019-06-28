const middleware = {}

middleware['routesHandler'] = require('../middleware/routesHandler.js');
middleware['routesHandler'] = middleware['routesHandler'].default || middleware['routesHandler']

export default middleware
