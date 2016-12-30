var counts = {
    harvester: 3,
    builder: 2,
    upgrader: 2,
    mechanic: 2
}
var abbrs = {
    harvester: "hrv",
    builder: "bld",
    upgrader: "upg",
    mechanic: "mcn"
}
var names = [
    "harvester",
    "builder",
    "upgrader",
    "mechanic"
]
module.exports = {
    getNames: function() {
        return names;
    },
    run: function(room) {
        var creepCount = Game.rooms[room].countCreeps()
        var spawner = Game.rooms[room].find(FIND_MY_SPAWNS)[0];
        // console.log(spawner);
        for(var namei = 0; namei < names.length; namei++) {
            var name = names[namei]
            if(creepCount[name] == undefined) {
                creepCount[name] = 0
            }
            // console.log(counts[name])
            if(creepCount[name] < counts[name]) {
                spawner.createCustomCreep(Game.rooms[room].energyCapacityAvailable, name, abbrs[name], {})
                return;
                // spawner.addCreepToQueue(Game.rooms[room].energyCapacityAvailable, name, abbrs[name], {})
                // console.log("ADDED")
            }
        }
        spawner.spawnNextInQueue()
    }
}
