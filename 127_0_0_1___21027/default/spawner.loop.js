/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner.loop');
 * mod.thing == 'a thing'; // true
 */
// var autoSpawner = require("spawner.auto");
var constructionSpawner = require("spawner.construct")
var repairSpawner = require("spawner.repair")
module.exports = {
    setup: function() {
        // autoSpawner = require("spawner.auto");
        constructionSpawner = require("spawner.construct")
        repairSpawner = require("spawner.repair")
    },
    pre: function(spawne) {
        Game.spawns[spawne].memory.buildingM = "Building"
        Game.spawns[spawne].memory.repairingM = "Repairing"
        Game.spawns[spawne].memory.meetingpoint = "MeetingPoint"
        constructionSpawner.run(spawne)
        repairSpawner.run(spawne)
    },
    post: function(spawne) {
        // autoSpawner.run(spawne);
        // if(Game.time % 60 == 0) {
        //     var amounts = {}
        //     var cs = Game.creeps
        //     for(var ci in cs) {
        //         var cit = cs[ci];
        //         if(amounts[cit.memory.role] == null) {
        //             amounts[cit.memory.role] = 0;
        //         }
        //         amounts[cit.memory.role]++;
        //     }
        //     for(var ari in amounts) {
        //         console.log(ari.charAt(0).toUpperCase() + ari.substring(1) + "s: " + amounts[ari])
        //     }
        // }
    }
}
