/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('console.commands');
 * mod.thing == 'a thing'; // true
 */

var spawnAuto = require('spawner.auto')

module.exports = {
    explore: function(destination) {
        spawnAuto.addQueued("explorer")
    }
};