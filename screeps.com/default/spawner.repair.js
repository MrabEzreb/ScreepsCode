/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner.construct');
 * mod.thing == 'a thing'; // true
 */

var spawnerRepair = {

    run: function(spawne) {
        // console.log(Game.spawns[spawne].memory.cconstruction)
        if(Game.spawns[spawne].memory.repairing == null || Game.spawns[spawne].memory.repairing == undefined || Game.spawns[spawne].memory.repairing.id == "null" || Game.time % 15 == 0) {
            if(Game.spawns[spawne].memory.repairing == null) {
                Game.spawns[spawne].memory.repairing = {id:"null"}
            }
            var s = Game.spawns[spawne].room.find(FIND_STRUCTURES, {filter: function(obj) {
                // if(obj.hits < obj.hitsMax) { console.log(obj + ": " + obj.hits) }
                return obj.hits < obj.hitsMax
            }});
            if (s.length) {
                var s2 = s.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax))
                // s.sort(function(a,b) {a.hits - b.hits});
                var s0 = s2[0]
                if(Game.spawns[spawne].memory.repairing.id != s0.id) {
                    console.log("MassRepair: Repairing at " + s0.pos.x + "," + s0.pos.y + " with " + s0.hits + "/" + s0.hitsMax);
                    Game.spawns[spawne].memory.repairing = s0;
                    Game.flags[Game.spawns[spawne].memory.repairingM].setPosition(s0.pos)
                }
            } else {
                Game.spawns[spawne].memory.repairing = {id:"null"}
                Game.flags[Game.spawns[spawne].memory.repairingM].setPosition(0,0)
            }
        } else {
            Game.spawns[spawne].memory.repairing = Game.getObjectById(Game.spawns[spawne].memory.repairing.id)
            if(Game.spawns[spawne].memory.repairing.hits == Game.spawns[spawne].memory.repairing.hitsMax) {
                Game.spawns[spawne].memory.repairing = {id:"null"}
            }
        }
    }
}

module.exports = spawnerRepair;
