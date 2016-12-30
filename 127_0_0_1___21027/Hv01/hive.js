var synaptic = require("synaptic");
var skies = Object.keys(synaptic)
// for (var sk in skies) {
//     if (skies.hasOwnProperty(sk)) {
//         console.log(synaptic[skies[sk]])
//     }
// }
// console.log()

var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect

// console.log(Network)

function Perceptron(input, hidden, output) {
    var inputLayer = new Layer(input)
    var hiddenLayer = new Layer(hidden)
    var outputLayer = new Layer(output)

    inputLayer.project(hiddenLayer)
    hiddenLayer.project(outputLayer)

    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    })
}

Perceptron.prototype = new Network()
Perceptron.prototype.constructor = Perceptron

module.exports = {
    testXOR: function() {
        var myPerceptron = new Perceptron(2, 3, 1)
        var myTrainer = new Trainer(myPerceptron)

        myTrainer.XOR()

        console.log(myPerceptron.activate([0,0]))
        console.log(myPerceptron.activate([1,0]))
        console.log(myPerceptron.activate([0,1]))
        console.log(myPerceptron.activate([1,1]))
    },
    createNetwork: function(inp, hid, out) {
        var p = new Perceptron(inp, hid, out)
        var t = new Trainer(p)
        return {
            perceptron: p,
            trainer: t
        }
    },
    getNetwork: function(json) {
        return Network.fromJSON(json);
    }
}
