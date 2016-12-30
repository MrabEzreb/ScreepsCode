/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner.construct');
 * mod.thing == 'a thing'; // true
 */

var spawnerConstruct = {
    
    run: function(spawne) {
        // console.log(Game.spawns[spawne].memory.cconstruction)
        if(Game.spawns[spawne].memory.cconstruction == null || Game.spawns[spawne].memory.cconstruction == undefined || Game.spawns[spawne].memory.cconstruction.id == "null") {
            var s = Game.spawns[spawne].room.find(FIND_CONSTRUCTION_SITES);
            if (s.length) {
                Game.spawns[spawne].memory.cconstruction = s[0];
                console.log("MassBuild: Building at " + s[0].pos.x + "," + s[0].pos.y);
                Game.flags[Game.spawns[spawne].memory.buildingM].setPosition(s[0].pos)
            } else {
                Game.spawns[spawne].memory.cconstruction = {id:"null"}
                Game.flags[Game.spawns[spawne].memory.buildingM].setPosition(0,0)
            }
        } else {
            Game.spawns[spawne].memory.cconstruction = Game.getObjectById(Game.spawns[spawne].memory.cconstruction.id)
        }
    }
}

module.exports = spawnerConstruct;