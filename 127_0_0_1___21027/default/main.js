var memClear = require("sys.memclear")
var roomMain = require("room.main")
var roleLoop = require("role.loop")
var spawnerLoop = require("spawner.loop")

module.exports.loop = function() {
    require("prototype")()
    memClear()
    roomMain("W5N8")
    roleLoop.runAll()
    spawnerLoop.pre("RB47")
}
