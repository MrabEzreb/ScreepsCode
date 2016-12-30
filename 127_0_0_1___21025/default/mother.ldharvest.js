module.exports = {
    addLDHarvest: function(motherroom, sid, rid) {
        Game.rooms[motherroom].memory.ldharvests.push({sid: sid, rid: rid});
    },
    run: function(motherroom) {
        
    },
    setup: function(motherroom) {
        Game.rooms[motherroom].memory.ldharvests = [];
        Game.rooms[motherroom].memory.ldharvesti = -1;
    },
    getLDSource: function(motherroom) {
        var ldharvests = Game.rooms[motherroom].memory.ldharvests;
        Game.rooms[motherroom].memory.ldharvesti = (Game.rooms[motherroom].memory.ldharvesti + 1) % Game.rooms[motherroom].memory.ldharvests.length;
        console.log("Gave an ldharvest")
        return ldharvests[Game.rooms[motherroom].memory.ldharvesti];
    }
};