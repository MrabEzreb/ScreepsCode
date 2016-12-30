module.exports = {
    initOrigin: function() {
        var origin = {
            rooms: [],
            creepCount: 0,
            active: true,
            loopCommands: ["feed", "upgrade"]
        }
        origin.commands = [];
        Memory.origin = origin
        Game.notify("<h1 style='color: #330000; text-align: center; font-size: 100px;'><span style='color: #770000;'>Origin</span> Has Risen</h1>")
        console.log("<br><h1 style='color: #330000; width: 800px; margin-left: 300px; text-align: center; font-size: 100px;'><span style='color: #770000;'>Origin</span> Has Risen</h1>")
        var rooms = Game.rooms
        for(var room in rooms) {
            module.exports.linkOrigin(room)
        }
    },
    tickOrigin: function() {
        Memory.origin.commands = Memory.origin.commands.sort((a,b) => a.priority - b.priority)
        var origin = Memory.origin
        var rooms = origin.rooms
        for (var room in rooms) {
            if (rooms.hasOwnProperty(room)) {
                var r = origin.rooms[room]
                Game.rooms[r].tickOrigin()
            }
        }
    },
    linkOrigin: function(roomName) {
        var origin = Memory.origin
        if(!Memory.origin.rooms.includes(roomName) && Game.rooms[roomName] != null) {
            Memory.origin.rooms.push(roomName)
            Game.rooms[roomName].initOrigin()
        }
    }
}
