module.exports = function() {
    StructureSpawn.prototype.createCustomCreep = function(energy, roleName, roleAbbr, memory) {
        var numberOfParts = Math.floor(energy / 200)
        var body = [];
        for(var i = 0; i < numberOfParts; i++) {
            body.push(WORK)
        }
        for(var i = 0; i < numberOfParts; i++) {
            body.push(CARRY)
        }
        for(var i = 0; i < numberOfParts; i++) {
            body.push(MOVE)
        }
        if(this.memory[roleName+"s"] == undefined) {
            this.memory[roleName+"s"] = 0;
        }
        if(this.memory.totalCreeps == undefined) {
            this.memory.totalCreeps = 0;
        }
        if(this.canCreateCreep(body, undefined, {}) != 0) {
            return false;
        } else {
            this.memory[roleName+"s"]++;
            this.memory.totalCreeps++;
            var name = this.memory[roleName+"s"] + roleAbbr + this.memory.totalCreeps;
            memory.home = this.name;
            memory.role = roleName;
            memory.tn = this.memory[roleName+"s"];
            memory.sn = this.memory.totalCreeps;
            this.createCreep(body, name, memory);
            return true;
        }
    }
    StructureSpawn.prototype.addCreepToQueue = function(energy, roleName, roleAbbr, memory) {
        if(this.memory.creepQueue == undefined) {
            this.memory.creepQueue = [];
        }
        this.memory.creepQueue.push([energy, roleName, roleAbbr, memory])
    }
    StructureSpawn.prototype.spawnNextInQueue = function() {
        if(this.memory.creepQueue == undefined) {
            this.memory.creepQueue = [];
        }
        var queuedl = this.memory.creepQueue;
        if(queuedl.length) {
            var queued = this.memory.creepQueue[0];
            if(this.createCustomCreep(queued[0], queued[1], queued[2], queued[3])) {
                this.memory.creepQueue.shift()
            }
        }
    }
    Room.prototype.countCreeps = function() {
        var mycreeps = this.find(FIND_MY_CREEPS)
        var amounts = {}
        for (var c in mycreeps) {
            cr = mycreeps[c]
            if(amounts[cr.memory.role] == undefined) {
                amounts[cr.memory.role] = 1;
            } else {
                amounts[cr.memory.role]++
            }
        }
        return amounts
    }
    Room.prototype.getSpawner = function() {
        return this.find(FIND_MY_SPAWNS)[0]
    }
}
