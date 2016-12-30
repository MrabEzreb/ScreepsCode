var roleMechanic = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            // creep.say('harvesting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	       // creep.say('building');
	    }

	    if(creep.memory.repairing) {
	        //targets[0] = "#01662a6a64a7ec0";
            // creep.say(sources[sources[creep.memory.number % sources.length]])
            // console.log(Game.getObjectById(Game.spawns[creep.memory.home].memory.cconstruction.id))
            var sid = Game.spawns[creep.memory.home].memory.repairing
            if(Game.spawns[creep.memory.home].memory.massrepair == true) {
                var s = creep.room.find(FIND_STRUCTURES, {filter: function(obj) {
                    return obj.hits < obj.hitsMax
                }});
                sid = s[creep.memory.number % s.length]
                // console.log(sid.pos.x + "," + sid.pos.y)
            }
            if(sid == null) {return}
            sid = sid.id;
            if(sid != "null") {
                var s = Game.getObjectById(sid)
                if(creep.repair(s) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(s);
                }
            } else {
                creep.moveTo(Game.flags[Game.spawns[creep.memory.home].memory.meetingpoint])
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
	       // console.log(source);
	       // console.log(creep.harvest(source))
            if(creep.harvest(sources[creep.memory.sn % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sn % sources.length]);
            }
	    }
	}
};

module.exports = roleMechanic;
