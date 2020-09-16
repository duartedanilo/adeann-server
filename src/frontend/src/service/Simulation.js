export default class Simulation {
  constructor() {
    this.nent = 1;
    this.nsai = 1;
    this.nint = 1;
    this.nintX = [{min: 1, max: 200}, {min:1, max: 200}];
    this.activationFunction = {'0': 'tanh', '1': 'tanh'};
    this.batch = '32';
    this.optimizer = 'rmsprop';
    this.epochs = 1000;

    this.generation = 10;
    this.population = 10;
    this.learningRate = 1;

    this.testFile = null;
    this.trainFile = null;
  }

  setNent = _nent => {
    this.nent = _nent;
  };
  setNsai = _nsai => {
    this.nsai = _nsai;
  };
  setNint = _nint => {
    this.nint = _nint;
  };
  setNintX = _nintX => {
    this.nintX = _nintX;
  };
  setActivationFunctionX = _activationFunction => {
    this.activationFunction = _activationFunction;
  };
  setOptimizer = _optimizer => {
    this.optimizer = _optimizer;
  };
  setBatch = _batch => {
    this.batch = _batch;
  };
  setEpochs = _epochs => {
    this.epochs = _epochs;
  };
  setGeneration = _generation => {
    this.generation = _generation;
  };
  setPopulation = _population => {
    this.population = _population;
  };
  setLearningRate = _learningRate => {
    this.learningRate = _learningRate;
  };
  setTestFile = _testFile => {
    this.testFile = _testFile;
  };
  setTrainFile = _trainFile => {
    this.trainFile = _trainFile;
  };

  toString = () => {
    return `{
    "nent": ${this.nent},
    "nsai": ${this.nsai},
    "nint": ${this.nint},
    "nintX": ${JSON.stringify(this.nintX)},
    "activationFunction": ${JSON.stringify(this.activationFunction)},
    "optimizer": ${this.optimizer},
    "batch": ${this.batch},
    "epochs": ${this.epochs},
    "generation": ${this.generation},
    "population": ${this.population},
    "learningRate": ${this.learningRate}
}`;
  };
}
