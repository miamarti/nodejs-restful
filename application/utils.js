
module.exports = function(app, db, config) {

	var entityCollection = config.db.entityCollection;
	return {
		findById: function(req, res) {
			var id = req.params.id;
			console.log('Retrieving entity: ' + id);
			db.collection(entityCollection, function(err, collection) {
				collection.findOne({'_id': new config.ObjectID(id)}, function(err, item) {
					res.send(item);
				});
			});
		},
		findAll: function(req, res) {
			db.collection(entityCollection, function(err, collection) {
				collection.find().toArray(function(err, items) {
					res.send(items);
				});
			});
		},
		addEntity: function(req, res) {
			var entity = req.body;
			console.log('Adding entity: ' + JSON.stringify(entity));
			db.collection(entityCollection, function(err, collection) {
				collection.insert(entity, {safe:true}, function(err, result) {
					if (err) {
						res.send({'error':'An error has occurred'});
					} else {
						console.log('Success: ' + JSON.stringify(result[0]));
						res.send(result[0]);
					}
				});
			});
		},
		
		updateEntity: function(req, res) {
			var id = req.params.id;
			var entity = req.body;
			entity.$set?delete entity.$set._id:delete entity._id;
			console.log('Updating entity: ' + id);
			console.log(JSON.stringify(entity));
			db.collection(entityCollection, function(err, collection) {
				collection.update({'_id': new config.ObjectID(id)}, entity, {safe:true}, function(err, result) {
					if (err) {
						console.log('Error updating entity: ' + err);
						res.send({'error':'An error has occurred'});
					} else {
						console.log('' + result + ' document(s) updated');
						res.send(entity);
					}
				});
			});
		},
		deleteEntity: function(req, res) {
			var id = req.params.id;
			console.log('Deleting entity: ' + id);
			db.collection(entityCollection, function(err, collection) {
                console.log(new config.ObjectID(id));
				collection.remove({'_id': new config.ObjectID(id)}, {safe:true}, function(err, result) {
					if (err) {
						res.send({'error':'An error has occurred - ' + err});
					} else {
						console.log('' + result + ' document(s) deleted');
						res.send(req.body);
					}
				});
			});
		},
		// Populate database with sample data -- Only used once: the first time the application is started.
		// You'd typically not find this code in a real-life app, since the database would already exist.
		populateDB: function(force) {
			db.collection(entityCollection, {safe:true}, function(err, collection) {
				if(err || force){
					var index = {};
					config.field.unique.forEach(
						function(uniqueField){
							index[uniqueField]=1;
							db.collection(entityCollection).ensureIndex(index, {unique:true}, 
								function(err, indexName) {
									if(err){
										console.log('cannot set unique index: '+uniqueField);
									}
								});
						}
					);					
				};
				if (err) {
					console.log("Collection doesn't exist. Creating it with sample data...");

					var sampleData = config.sampleData;
					db.collection(entityCollection, function(err, collection) {
						collection.insert(sampleData, {safe:true}, function(err, result) {});
					});

				}
			});
		}
	};
};

/*
		 uploadEntity: = function(req, res) {
		 var id = req.params.id;
		 //var util = require('util');
		 //  console.log('Uploading entity: ' + util.inspect(req, false, null));
		 console.log('Uploading entity: ' + id);
		 //   var entity = req.body;
		 fs.readFile(req.files.file.path, function (err, data) {
		 // ...
		 var newPath = "/zyp/uploadedFileName";
		 fs.writeFile(newPath, data, function (err) {
		 res.redirect("back");
		 });
		 });
		 
		 //    res.redirect('./uploads/fullsize/' + fileName);


		 db.collection(entityCollection, function(err, collection) {
		 collection.update({'_id':new BSON.ObjectID(id)}, entity, {safe:true}, function(err, result) {
		 if (err) {
		 console.log('Error updating entity: ' + err);
		 res.send({'error':'An error has occurred'});
		 } else {
		 console.log('' + result + ' document(s) updated');
		 res.send(entity);
		 }
		 });
		 });

*/
