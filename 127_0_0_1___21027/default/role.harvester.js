var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        // console.log(creep)
		if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var tr = creep.harvest(sources[creep.memory.sn % sources.length])
            // console.log(tr)
            if(tr == ERR_NOT_IN_RANGE) {
                var rt = creep.moveTo(sources[creep.memory.sn % sources.length]);
                // console.log(rt)
                if(rt == -2) {
                    creep.memory.stuckfor++;
                } else {
                    creep.memory.stuckfor = 0;
                }
                if(creep.memory.stuckfor > 50) {
                    creep.drop(RESOURCE_ENERGY, creep.carry.energy);
                    creep.suicide()
                }
            }
        }
        else {
            if(Game.spawns[creep.memory.home].energy < Game.spawns[creep.memory.home].energyCapacity) {
                if(creep.transfer(Game.spawns[creep.memory.home], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
                        creep.moveTo(Game.flags[Game.spawns[creep.memory.home].memory.meetingpoint])
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
};

module.exports = roleHarvester;
