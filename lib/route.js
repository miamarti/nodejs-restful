module.exports = function(app, config, utils) {
	app.get(config.restRoot, config.authenticateMethod, utils.findAll);
	app.get(config.restRoot+'/:id', config.authenticateMethod, utils.findById);
	app.post(config.restRoot, config.authenticateMethod, utils.addEntity);
	app.put(config.restRoot+'/:id', config.authenticateMethod, utils.updateEntity);
	app.delete(config.restRoot+'/:id', config.authenticateMethod, utils.deleteEntity);
};
