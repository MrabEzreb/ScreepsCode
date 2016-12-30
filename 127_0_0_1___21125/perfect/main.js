var memClear = require("sys.memclear")
var roomMain = require("room.main")
var roleLoop = require("role.loop")
var spawnerLoop = require("spawner.loop")

var room = null

module.exports.loop = function() {
    if(room != null) {
        Game.rooms[room].find(FIND_MY_SPAWNS)[0].memory.buildingM = null;
        Game.rooms[room].find(FIND_MY_SPAWNS)[0].memory.repairingM = null;
        require("prototype")()
        memClear()
        roomMain(room)
        roleLoop.runAll()
        spawnerLoop.pre(Game.rooms[room].find(FIND_MY_SPAWNS)[0].name)
    }
}
