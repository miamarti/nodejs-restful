
module.exports = function(app, db, config) {
	var badCredentials = {
		message: 'Bad credentials.'
	};
	var entityCollection = config.db.entityCollection;
	return {
		
		findById: function(req, res) {
			var carry = function(){
				var id = req.params.id;
				db.collection(entityCollection, function(err, collection) {
					collection.findOne({'_id': new config.ObjectID(id)}, function(err, item) {
						res.send(item);
					});
				});
			};
            if(config.token !== undefined){
                if(req.query._token === config.token){
					carry();
                } else {
                    res.send(badCredentials);
                }
            } else {
                carry();
            }
		},
		
		findAll: function(req, res) {
			var carry = function(){
				db.collection(entityCollection, function(err, collection) {
					collection.find().toArray(function(err, items) {
						res.send(items);
					});
				});
			};
            if(config.token !== undefined){
                if(req.query._token === config.token){
					carry();
                } else {
                    res.send(badCredentials);
                }
            } else {
                carry();
            }
		},
		
		addEntity: function(req, res) {
            var carry = function(){
				var entity = req.body;
				db.collection(entityCollection, function(err, collection) {
					collection.insert(entity, {safe:true}, function(err, result) {
						if (err) {
							res.send({'error':'An error has occurred'});
						} else {
							res.send(result);
						}
					});
				});
			};
            if(config.token !== undefined){
                if(req.query._token === config.token){
					carry();
                } else {
                    res.send(badCredentials);
                }
            } else {
                carry();
            }
		},
		
		updateEntity: function(req, res) {
			var carry = function(){
				var id = req.params.id;
				var entity = req.body;
				entity.$set?delete entity.$set._id:delete entity._id;
				db.collection(entityCollection, function(err, collection) {
					collection.update({'_id': new config.ObjectID(id)}, entity, {safe:true}, function(err, result) {
						if (err) {
							res.send({'error':'An error has occurred'});
						} else {
							console.log('' + result + ' document(s) updated');
							res.send(entity);
						}
					});
				});
			};
            if(config.token !== undefined){
                if(req.query._token === config.token){
					carry();
                } else {
                    res.send(badCredentials);
                }
            } else {
                carry();
            }
		},

		deleteEntity: function(req, res) {
            var carry = function(){
				var id = req.params.id;
				db.collection(entityCollection, function(err, collection) {
					collection.remove({'_id': new config.ObjectID(id)}, {safe:true}, function(err, result) {
						if (err) {
							res.send({'error':'An error has occurred - ' + err});
						} else {
							res.send(req.body);
						}
					});
				});
			};
            if(config.token !== undefined){
                if(req.query._token === config.token){
					carry();
                } else {
                    res.send(badCredentials);
                }
            } else {
                carry();
            }
		}

	};
};
