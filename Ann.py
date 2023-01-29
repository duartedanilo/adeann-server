from abc import ABC, abstractmethod

from typing import List, Dict

from helpers import *

Topology = Dict[int, str]
class Ann(ABC):
    def __init__(self):
        self.NENT = 0
        self.topology = None
        self.epochs = None
        self.LEARNING_RATE = 0.0
        self.OPTIMIZER = ''
        self.BATCH_SIZE = 0

    def get_optimizer(self, optimizer, lr):
        optimizer_list = {
            'rmsprop': rmspropOptimizerFunction(lr),
            'sgd': sgdOptimizerFunction(lr),
            'adam': adamOptimizerFunction(lr)
        }

        return optimizer_list[optimizer]

    def configuration(self):
        print(self.NENT)
        print(self.topology)
        print(self.LEARNING_RATE)
        print(self.OPTIMIZER)
        print(self.BATCH_SIZE)

    def set_topology(self, nent: int, topology: List[Topology]):
        if (len(topology) < 2):
            raise Exception("The neural network needs at least 2 layers")

        self.NENT = nent
        self.topology = topology

    def set_hyperparameters(self, epochs: int, learning_rate: float, optimizer: str, batch_size: int):
        self.epochs = epochs
        self.LEARNING_RATE = learning_rate
        self.OPTIMIZER = optimizer
        self.BATCH_SIZE = batch_size

    @abstractmethod
    def run(self):
        pass
