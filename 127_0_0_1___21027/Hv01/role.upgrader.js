var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.upgrading == null) {
            creep.memory.upgrading = true;
        }
        if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
	    if(creep.memory.upgrading && creep.carry.energy == 0) {
	        creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        if(creep.memory.upgrading && creep.carry.energy > 0) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                var rt = creep.name + " " + creep.moveTo(creep.room.controller);
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
	}
};

module.exports = roleUpgrader;