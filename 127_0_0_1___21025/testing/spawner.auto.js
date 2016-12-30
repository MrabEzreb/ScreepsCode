/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawner.auto');
 * mod.thing == 'a thing'; // true
 */

var spawnerDefaults = {}
var queueAdv = function(spawne) {
    var queue = Game.spawns[spawne].memory.queue;
    if(queue == null) {
        Game.spawns[spawne].memory.queue = [];
        queue = Game.spawns[spawne].memory.queue;
    }
    spawner = Game.spawns[spawne];
    if(spawner.memory[name+"s"] == null) {
        spawner.memory[name+"s"] = 0;
    }
    if(spawner.memory.spawning) {
        return;
    }
    if(queue.length == 0) {
        return;
    }
    var queued = queue.pop();
    var name = queued;
    var defaults = spawnerDefaults[queued];
    var can = spawner.canCreateCreep(defaults.body);
    if(can == 0) {
        console.log("AutoSpawn: Spawning number " + spawner.memory[name+"s"] + " creep of type " + name);
        spawner.memory.spawning = true;
        spawner.createCreep(defaults.body, spawner.memory.spawned + name.charAt(0) + spawner.memory[name+"s"], {role: name, number: spawner.memory[name+"s"], home: spawne});
        spawner.memory[name+"s"]++;
        spawner.memory.spawned++;
    } else {
        queue.push(queued)
    }
    Game.spawns[spawne].memory.queue = queue;
}
var check = function(name, spawne) {
    spawner = Game.spawns[spawne];
    if(spawner.memory[name+"s"] == null) {
        spawner.memory[name+"s"] = 0;
    }
    if(spawner.memory.spawning) {
        return;
    }
    var num = 0;
    for(var i in Game.creeps) {
        if(Game.creeps[i].memory.role == name) {
            num++;
        }
    }
    var defaults = spawnerDefaults[name];
    //console.log(name + ": " + num + " = " + defaults.count);
    if(num < defaults.count) {
        var can = spawner.canCreateCreep(defaults.body);
        if(can == 0) {
            console.log("AutoSpawn: Spawning number " + spawner.memory[name+"s"] + " creep of type " + name);
            spawner.memory.spawning = true;
            spawner.createCreep(defaults.body, spawner.memory[name+"s"] + name.charAt(0) + spawner.memory.spawned, {role: name, number: spawner.memory[name+"s"], home: spawne});
            spawner.memory[name+"s"]++;
            spawner.memory.spawned++;
            var x = spawner.memory.spawned;
            if((x & (x - 1)) == 0) {
                Game.notify("YAY! " + x + " creeps spawned!")
            }
        }
    }
}

var autoSpawner = {
    addQueued: function(def, spawne) {
        Game.spawns["RB47"].memory.queue.push(def);
    },
    update: function() {
        spawnerDefaults = {
            harvester: {count: 8, body: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]},
            builder: {count: 8, body: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]},
            upgrader: {count: 6, body: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]},
            explorer: {body: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]}
        }
    },
    run: function(spawner) {
        autoSpawner.update();
        Game.spawns[spawner].memory.spawning = false;
        check("harvester", spawner);
        check("upgrader", spawner);
        check("builder", spawner);
        queueAdv(spawner)
    }
};

module.exports = autoSpawner;