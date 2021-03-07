class Simulation {
  constructor() {
    localStorage.clear();
    this.annType = "DENSE";
    this.nent = 1;
    this.nsai = 1;
    this.nint = [1];
    this.nintX = {
      "0_0": { min: 1, max: 200 },
      "1_0": { min: 1, max: 200 },
      "1_1": { min: 1, max: 200 },
    };
    this.activationFunction = {
      "0_0": "tanh",
      "1_0": "tanh",
      "1_1": "tanh",
      N_0: "linear",
    };
    this.batch = "32";
    this.optimizer = ["rmsprop"];
    this.epochs = 1000;

    this.generation = 10;
    this.population = 10;
    this.learningRate = 1;

    this.testFile = null;
    this.trainFile = null;

    this.simulation = "";
    this.interpreter = "";
    localStorage.setItem("simulation", this.toString());
  }

  setAnnType = (_annType) => {
    this.annType = _annType;
    this.updateStorage();
  };

  setNent = (_nent) => {
    this.nent = _nent;
    this.updateStorage();
  };
  setNsai = (_nsai) => {
    this.nsai = _nsai;
    this.updateStorage();
  };
  setNint = (_nint) => {
    this.nint = _nint;
    this.updateStorage();
  };
  setNintX = (_nintX) => {
    this.nintX = _nintX;
    this.updateStorage();
  };
  setActivationFunctionX = (_activationFunction) => {
    this.activationFunction = _activationFunction;
    this.updateStorage();
  };
  setOptimizer = (_optimizer) => {
    this.optimizer = _optimizer;
    this.updateStorage();
  };
  setBatch = (_batch) => {
    this.batch = _batch;
    this.updateStorage();
  };
  setEpochs = (_epochs) => {
    this.epochs = _epochs;
    this.updateStorage();
  };
  setGeneration = (_generation) => {
    this.generation = _generation;
    this.updateStorage();
  };
  setPopulation = (_population) => {
    this.population = _population;
    this.updateStorage();
  };
  setLearningRate = (_learningRate) => {
    this.learningRate = _learningRate;
    this.updateStorage();
  };
  setTestFile = (_testFile) => {
    this.testFile = _testFile;
    this.updateStorage();
  };
  setTrainFile = (_trainFile) => {
    this.trainFile = _trainFile;
    this.updateStorage();
  };
  setSimulation = (_simulation) => {
    this.simulation = _simulation;
    this.updateStorage();
  };
  setInterpreter = (_interpreter) => {
    this.interpreter = _interpreter;
    this.updateStorage();
  };

  updateStorage = () => localStorage.setItem("simulation", this.toString());
  clearStorage = () => localStorage.clear();
  load = () => localStorage.getItem("simulation");

  toString = () => {
    return `{
    "annType": ${this.annType},  
    "nent": ${this.nent},
    "nsai": ${this.nsai},
    "nint": ${JSON.stringify(this.nint)},
    "nintX": ${JSON.stringify(this.nintX)},
    "activationFunction": ${JSON.stringify(this.activationFunction)},
    "optimizer": ${JSON.stringify(this.optimizer)},
    "batch": ${this.batch},
    "epochs": ${this.epochs},
    "generation": ${this.generation},
    "population": ${this.population},
    "learningRate": ${this.learningRate},
    "simulation": ${this.simulation},
    "interpreter": ${this.interpreter}
}`;
  };

  toJSON = () => {
    return {
      annType: this.annType,
      nent: this.nent,
      nsai: this.nsai,
      nint: JSON.stringify(this.nint),
      nintX: JSON.stringify(this.nintX),
      activationFunction: JSON.stringify(this.activationFunction),
      optimizer: JSON.stringify(this.optimizer),
      batch: this.batch,
      epochs: this.epochs,
      generation: this.generation,
      population: this.population,
      learningRate: this.learningRate,
      simulation: this.simulation,
      interpreter: this.interpreter,
    };
  };
}

export default new Simulation();
