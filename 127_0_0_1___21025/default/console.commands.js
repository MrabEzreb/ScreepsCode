/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('console.commands');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    globalize: function() {
        global.cm = module.exports.update();
    },
    update: function() {
        return {
            generateClaimer: function(spawner, destination) {
                Game.spawns[spawner].createCreep([CLAIM, MOVE], "CLAIMER", {role: "claimer", target: destination})
            },
            addLDHarvest: function(motherroom, sid, rid) {
                require("mother.ldharvest").addLDHarvest(motherroom, sid, rid)
            },
            creepCounts: function() {
                var amounts = {}
                var cs = Game.creeps
                for(var ci in cs) {
                    var cit = cs[ci];
                    if(amounts[cit.memory.role] == null) {
                        amounts[cit.memory.role] = 0;
                    }
                    amounts[cit.memory.role]++;
                }
                var spawnerDefaults = require("spawner.auto").getDefaults();
                for(var ari in spawnerDefaults) {
                    var count = spawnerDefaults[ari].count;
                    var ccount = amounts[ari] || 0
                    if(count == 0 && ccount == 0) {
                        continue;
                    }
                    console.log(ari.charAt(0).toUpperCase() + ari.substring(1) + "s: " + ccount + "/" + count)
                }
            }
        }
    }

};
