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
            var spawns = creep.room.find(FIND_MY_SPAWNS, {filter: obj => obj.energy < obj.energyCapacity})
            if(spawns != null && spawns.length > 0) {
                goto = spawns.sort((a,b) => a.energy - b.energy)[0]
            } else {
                var ext = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
                if(ext.length > 0) {
                    ext = ext.sort((a, b) => a.energy - b.energy)[0]
                    if(ext.energy < ext.energyCapacity) {
                        goto = ext
                    }
                } else {
                    return
                }
            }
            var vla = creep.transfer(goto, RESOURCE_ENERGY)
            if(vla == ERR_NOT_IN_RANGE) {
                creep.moveTo(goto)
            } else if(vla == 0) {
                module.exports.complete(creep)
                // console.log(vla)
            }
        }
    },
    complete: function(creep) {
        creep.drop(RESOURCE_ENERGY, creep.carry.energy)
        creep.memory.job = undefined
    },
    needed: function(roomName) {
        return Game.rooms[roomName].energyAvailable < Game.rooms[roomName].energyCapacityAvailable
    }
}
