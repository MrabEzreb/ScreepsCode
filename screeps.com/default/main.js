var memClear = require("sys.memclear")
var roomMain = require("room.main")
var roleLoop = require("role.loop")
var spawnerLoop = require("spawner.loop")

var room = "W38S75"

module.exports.loop = function() {
    if(room != null) {
        Game.rooms[room].find(FIND_MY_SPAWNS)[0].memory.buildingM = "Building";
        Game.rooms[room].find(FIND_MY_SPAWNS)[0].memory.repairingM = "Repairing";
        require("prototype")()
        memClear()
        roomMain(room)
        roleLoop.runAll()
        spawnerLoop.pre(Game.rooms[room].find(FIND_MY_SPAWNS)[0].name)
    }
}
