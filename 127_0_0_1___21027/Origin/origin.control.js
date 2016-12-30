module.exports = function() {
    Room.prototype.initOrigin = function() {
        this.memory.spawners = this.find(FIND_MY_SPAWNS);
        this.memory.creepCount = 0
        this.memory.sources = this.find(FIND_SOURCES).map((e, i, a) => return e.id);
        this.memory.nextAssign = 0
    }
    Room.prototype.tickOrigin = function() {
        var origin = Memory.origin
        var commands = origin.commands.sort((a,b) => a.urgency - b.urgency)
        var urgentCommand = null;
        for (var i = 0; i < commands.length; i++) {
            if(commands[i].urgency == 0xFF) {
                urgentCommand = commands[i].name;
                break;
            }
        }
        var creeps = this.find(FIND_MY_CREEPS)
        for (var creepi in creeps) {
            if (creeps.hasOwnProperty(creepi)) {
                var creep = creeps[creepi]
                if(urgentCommand != null) {
                    creep.stopJob()
                    creep.startJob(urgentCommand)
                } else {
                    if(creep.hasJob()) {
                        creep.doJob()
                    } else {
                        creep.start(commands.shift().name)
                    }
                }
            }
        }
    }
    Room.prototype.assignSource = function() {
        var retval = this.memory.sources[this.memory.nextAssign]
        this.memory.nextAssign = (this.memory.nextAssign + 1) % this.memory.sources.length
        return retval
    }
    StructureSpawn.prototype.initOrigin = function() {
        this.memory.creeps = 0
    }
    StructureSpawn.prototype.tickOrigin = function() {
        var origin = Memory.origin
        var commands = origin.commands
    }
    StructureSpawn.prototype.generateBasicCreep = function(energy) {
        var partCount = Math.floor(energy / 250)
        var body = []
        for (var i = 0; i < partCount; i++) {
            body.push(WORK)
            body.push(CARRY)
            body.push(MOVE)
            body.push(MOVE)
        }
        if(this.canCreateCreep(body)) {
            var name = this.name.toUpperCase() + ":" + this.memory.creeps.toString(16).toUpperCase() + ":" + this.room.name.toUpperCase() + ":" + this.room.memory.creepCount.toString(16).toUpperCase() + ":" + Game.time.toString(36).toUpperCase() + ":" + Memory.origin.creepCount.toString(16).toUpperCase();
            this.createCreep(body, name, {spawnedFrom: this.name, spawnedIn: this.room.name})
            return this.spawning.id;
        } else {
            return false;
        }
    }
    Creep.prototype.startJob = function(jobname) {
        var jobModule = require("job." + jobname)
        jobModule.start(this)
        this.memory.working = true
        this.memory.workingOn = jobname
    }
    Creep.prototype.doJob = function() {
        var jobModule = require("job." + this.memory.workingOn)
        jobModule.do(this)
    }
    Creep.prototype.stopJob = function() {
        var jobModule = require("job." + this.memory.workingOn)
        jobModule.complete(this)
    }
    Creep.prototype.hasJob = function() {
        return this.memory.working == true
    }
}
