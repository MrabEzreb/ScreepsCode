var memClear = require("sys.memclear")
var spawnerLoop = require("spawner.loop")
var roleLoop = require("role.loop")
var consoleCommands = require("console.commands")

module.exports.loop = function () {

    spawnerLoop.setup()
    spawnerLoop.pre("RB47")
    memClear()
    roleLoop.runAll()
    spawnerLoop.post("RB47")
    consoleCommands.globalize();
    
}