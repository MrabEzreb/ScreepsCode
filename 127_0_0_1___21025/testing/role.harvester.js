var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
		if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.number % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.number % sources.length]);
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
};

module.exports = roleHarvester;