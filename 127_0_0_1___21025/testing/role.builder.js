var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            // creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	       // creep.say('building');
	    }

	    if(creep.memory.building) {
	        //targets[0] = "#01662a6a64a7ec0";
            // creep.say(sources[sources[creep.memory.number % sources.length]])
            // console.log(Game.getObjectById(Game.spawns[creep.memory.home].memory.cconstruction.id))
            var sid = Game.spawns[creep.memory.home].memory.cconstruction
            if(sid == null) {return}
            sid = sid.id;
            if(sid != "null") {
                var s = Game.getObjectById(sid)
                if(creep.build(s) == ERR_NOT_IN_RANGE) {
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
            if(creep.harvest(sources[creep.memory.number % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.number % sources.length]);
            }
	    }
	}
};

module.exports = roleBuilder;