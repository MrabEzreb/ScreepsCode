var roleLDHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name == Game.spawns[creep.memory.home].room.name && creep.carry.energy == 0 && creep.memory.working == false) {
            creep.memory.ldsource = null;
        }
        if(creep.memory.ldsource == null || creep.memory.ldsource == undefined) {
            creep.memory.ldsource = require("mother.ldharvest").getLDSource(Game.spawns[creep.memory.home].room.name)
        }
        if(creep.carry.energy == 0 || creep.memory.working == true) {
            creep.memory.working = true;
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.working = false;
            }
            // console.log(creep.room.name + "\n" + creep.memory.ldsource.rid)
            if(creep.room.name != creep.memory.ldsource.rid) {
                creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.ldsource.rid)));
            } else {
                var source = Game.getObjectById(creep.memory.ldsource.sid);
                var hrt = creep.harvest(source)
                // console.log("hrt " + hrt)
                if(hrt == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        } else {
            if(creep.room.name != Game.spawns[creep.memory.home].room.name) {
                creep.moveTo(Game.spawns[creep.memory.home]);
            } else {
                if(Game.spawns[creep.memory.home].energy < Game.spawns[creep.memory.home].energyCapacity) {
                    var rt = creep.transfer(Game.spawns[creep.memory.home], RESOURCE_ENERGY)
                    if(rt == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.spawns[creep.memory.home]);
                    }
                } else {
                    if(creep.memory.ext == undefined) {
                        var exts = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
                        for(var i2 in exts) {
                            i3 = exts[i2];
                            if(i3.energy < i3.energyCapacity) {
                                creep.memory.ext = exts[i2]
                                break;
                            }
                        }
                        if(creep.memory.ext == undefined) {
                            creep.moveTo(Game.spawns[creep.memory.home].memory.meetingpoint)
                        }
                    } else {
                        // creep.say("Ext: " + creep.memory.ext.energy)
                        creep.memory.ext = Game.getObjectById(creep.memory.ext.id)
                        if(Game.getObjectById(creep.memory.ext.id).energy == Game.getObjectById(creep.memory.ext.id).energyCapacity) {
                            creep.memory.ext = undefined;
                        }
                        if(creep.transfer(creep.memory.ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.memory.ext);
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleLDHarvester;