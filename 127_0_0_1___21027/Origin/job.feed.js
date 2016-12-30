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
            var goto = null
            var spawns = creep.find(FIND_MY_SPAWNS, {filter: obj => obj.energy < obj.energyCapacity})
            if(spawns != null && spawns.length > 0) {
                goto = spawns.sort((a,b) => a.energy - b.energy)
            } else {
                var ext = creep.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}}).sort((a, b) => a.energy - b.energy)[0]
                if(ext.energy < ext.energyCapacity) {
                    goto = ext
                }
            }
            var vla = creep.transfer(ext, RESOURCE_ENERGY)
            if(vla == ERR_NOT_IN_RANGE) {
                creep.moveTo(vla)
            }
        }
    },
    complete: function(creep) {
        creep.drop(RESOURCE_ENERGY, creep.carry.energy)
        creep.memory.job = undefined
    }
}
