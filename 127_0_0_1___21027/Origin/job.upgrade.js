module.exports = {
    start: function(creep) {
        creep.memory.job = {}
        creep.memory.job.assignedSource = creep.room.assignSource()
        creep.memory.job.harvesting = true;
    },
    do: function(creep) {
        if(creep.memory.job.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.job.harvesting = false
        }
        if(!creep.memory.job.harvesting && creep.carry.energy == 0) {
            creep.memory.job.harvesting = true
        }
        if(creep.memory.job.harvesting && creep.carry.energy < creep.carryCapacity) {
            var vla = creep.harvest(Game.getObjectById(creep.memory.job.assignedSource))
            if(vla == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.job.assignedSource))
            }
        }
        if(!creep.memory.job.harvesting && creep.carry.energy > 0) {
            var vla = creep.transfer(creep.room.controller, RESOURCE_ENERGY)
            if(vla == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller)
            }
        }
    },
    complete: function(creep) {
        creep.drop(RESOURCE_ENERGY, creep.carry.energy)
        creep.memory.job = undefined
    }
}
