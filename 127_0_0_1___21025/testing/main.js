var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleExplorer = require('role.explorer');
var autoSpawner = require("spawner.auto");
var constructionSpawner = require("spawner.construct")
var memClear = require("sys.memclear")

module.exports.loop = function () {

    memClear()
    constructionSpawner.run("RB47")
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'explorer') {
            roleExplorer.run(creep);
        }
    }
    
    autoSpawner.run("RB47");
}