var roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.moveTo(Game.flags[creep.memory.exploreto])
	}
};

module.exports = roleExplorer;