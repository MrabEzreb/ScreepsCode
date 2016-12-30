/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.loop');
 * mod.thing == 'a thing'; // true
 */
 
var run = function(name) {
    var roleMod = require("role." + name)
    for(var nam in Game.creeps) {
        var creep = Game.creeps[nam];
        if(creep.memory.role == name) {
            roleMod.run(creep)
        }
    }
}
module.exports = {
    runAll: function() {
        run("builder")
        // run("explorer")
        run("harvester")
        run("mechanic")
        run("upgrader")
        run("ldharvester")
        run("claimer")
    }
};