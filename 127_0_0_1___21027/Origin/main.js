var origin = require("origin")

module.exports.loop = function() {
    if(Memory.origin != undefined && Memory.origin.active == true) {
        origin.tickOrigin()
    }
}
