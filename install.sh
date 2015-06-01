sudo apt-get install mongodb-clients
sudo apt-get install mongodb-server
sudo rm /var/lib/mongodb/mongod.lock
sudo mongod --repair
sudo start mongodb
