DEBUG = True  # python lstm_args_2.py 2 100 200 tanh tanh 0.001 rmsprop 32 3 132132132 simulation_name path

import os
import uuid

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from datetime import datetime
from sys import argv, platform

import keras.backend as K
import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import json

from keras import metrics
from keras.layers import Dense
from keras.models import Sequential
from keras.optimizers import Adam, RMSprop, SGD
from sklearn.preprocessing import MinMaxScaler
from keras.callbacks import LambdaCallback

emitter = print

if not DEBUG:
    print = lambda _: _


def writePercentFeedback(percent):
    emitter(percent + "%")
    with open(SIMULATION_PATH + "/" + "subject_percent.log", "w") as file:
        file.write(percent + "%")


def adamOptimizerFunction(lr):
    return Adam(lr=lr)


def rmspropOptimizerFunction(lr):
    return RMSprop(lr=lr)


def sgdOptimizerFunction(lr):
    return SGD(lr=lr)


def getOptimizer(optimizer, lr):
    optmizer_list = {'rmsprop': rmspropOptimizerFunction(lr), 'sgd': sgdOptimizerFunction(lr),
                     'adam': adamOptimizerFunction(lr)}
    return optmizer_list[optimizer]


def getArgs(arg, reference):
    return arg if arg is not None else reference


def configuration():
    return {"NUMBER_OF_NINT": NUMBER_OF_NINT, "NENT": NENT, "NINT1": NINT1, "NINT2": NINT2,
            "LEARNING_RATE": LEARNING_RATE,
            "ACTIVATION_FUNCTION1": ACTIVATION_FUNCTION1, "ACTIVATION_FUNCTION2": ACTIVATION_FUNCTION2,
            "ACTIVATION_FUNCTION_N1": ACTIVATION_FUNCTION_N1,
            "OPTIMIZER": str(type(OPTIMIZER)), "BATCH_SIZE": BATCH_SIZE, "EPOCHS": EPOCHS}


def cal_sum_mape(y_real, y_pred):
    yield cal_diff_mape(y_real, y_pred)


def delimiter(type="@@@@@@@"):
    emitter("@@@@@@@@@@" + type + "@@@@@@@@@@")


def write_evaluation(pred, test):
    evaluation_list = ['{ "predicted": ' + str(pred[i]) + ',  "target": ' + str(test[i]) + " },\n" for i in
                       range(len(test))]

    return "[" + ''.join(evaluation_list) + "]"
    # return str(evaluation_list)


NENT = 5
NUMBER_OF_NINT = 1
NINT1 = 100
NINT2 = 100

LEARNING_RATE = 0.001
ACTIVATION_FUNCTION1 = 'tanh'  # linear /
ACTIVATION_FUNCTION2 = 'tanh'
ACTIVATION_FUNCTION_N1 = 'linear'

OPTIMIZER = getOptimizer('rmsprop', LEARNING_RATE)

BATCH_SIZE = 32
EPOCHS = 10000
NUMBER_OF_SUBJECT = 0
SIMULATION_NAME = ''
SIMULATION_PATH = ''

EPOCHS_PRINT_CALLBACK = LambdaCallback(
    on_epoch_end=lambda epoch, logs: writePercentFeedback(str(epoch)))


def setConfigurarion(argv):
    global NUMBER_OF_NINT, NENT, NINT1, NINT2, ACTIVATION_FUNCTION1, ACTIVATION_FUNCTION2, ACTIVATION_FUNCTION_N1, LEARNING_RATE, OPTIMIZER, BATCH_SIZE, EPOCHS, NUMBER_OF_SUBJECT, SIMULATION_NAME, SIMULATION_PATH, EPOCHS_PRINT_CALLBACK
    if str(argv[1]) is "1":
        NUMBER_OF_NINT = 1
        NENT = int(getArgs(str(argv[2]), NENT))
        NINT1 = int(getArgs(str(argv[3]), NINT1))
        ACTIVATION_FUNCTION1 = getArgs(str(argv[4]), ACTIVATION_FUNCTION1)
        ACTIVATION_FUNCTION_N1 = getArgs(str(argv[5]), ACTIVATION_FUNCTION_N1)
        LEARNING_RATE = float(getArgs(str(argv[6]), LEARNING_RATE))
        OPTIMIZER = getOptimizer(str(argv[7]), LEARNING_RATE)
        BATCH_SIZE = int(getArgs(str(argv[8]), BATCH_SIZE))
        EPOCHS = int(getArgs(str(argv[9]), EPOCHS))
        NUMBER_OF_SUBJECT = int(getArgs(str(argv[10]), NUMBER_OF_SUBJECT))
        SIMULATION_NAME = getArgs(str(argv[11]), SIMULATION_NAME)
        SIMULATION_PATH = getArgs(str(argv[12]), SIMULATION_PATH)
        EPOCHS_PRINT_CALLBACK = LambdaCallback(
            on_epoch_end=lambda epoch, logs: writePercentFeedback(str(epoch * 100 / EPOCHS)),
            on_train_end=lambda logs: writePercentFeedback("100.0"))
    else:
        NUMBER_OF_NINT = 2
        NENT = int(getArgs(str(argv[2]), NENT))
        NINT1 = int(getArgs(str(argv[3]), NINT1))
        NINT2 = int(getArgs(str(argv[4]), NINT2))
        ACTIVATION_FUNCTION1 = getArgs(str(argv[5]), ACTIVATION_FUNCTION1)
        ACTIVATION_FUNCTION2 = getArgs(str(argv[6]), ACTIVATION_FUNCTION2)
        ACTIVATION_FUNCTION_N1 = getArgs(str(argv[7]), ACTIVATION_FUNCTION_N1)
        LEARNING_RATE = float(getArgs(str(argv[8]), LEARNING_RATE))
        OPTIMIZER = getOptimizer(str(argv[9]), LEARNING_RATE)
        BATCH_SIZE = int(getArgs(str(argv[10]), BATCH_SIZE))
        EPOCHS = int(getArgs(str(argv[11]), EPOCHS))
        NUMBER_OF_SUBJECT = int(getArgs(str(argv[12]), EPOCHS))
        SIMULATION_NAME = getArgs(str(argv[13]), SIMULATION_NAME)
        SIMULATION_PATH = getArgs(str(argv[15]), SIMULATION_PATH)
        EPOCHS_PRINT_CALLBACK = LambdaCallback(
            on_epoch_end=lambda epoch, logs: writePercentFeedback(str(epoch * 100 / EPOCHS)),
            on_train_end=lambda logs: writePercentFeedback("100.0"))


def load_dataset(dataset):
    data = dataset
    data_y = data.iloc[:, -1]
    data_x = data.iloc[:, :-1]
    return data_x, data_y


def argsFormatted():
    numberOfHiddenLayers = int(argv[1])

    if numberOfHiddenLayers is 1:
        print("Number of hidden layers: " + str(argv[1]))
        print("Number of 1ª hidden layers: " + str(argv[2]))
        print("Activation function 1º: " + str(argv[3]))
        print("Activation function Out Layer: " + str(argv[4]))
        print("Learning Rate: " + str(argv[5]))
        print("Optimizer: " + str(argv[6]))
        print("Batch size: " + str(argv[7]))
        print("Epochs:     " + str(argv[8]))
        print("Simulation name:     " + str(argv[9]))
        print("Path:     " + str(argv[10]))

    if numberOfHiddenLayers is 2:
        print("Number of hidden layers: " + str(argv[1]))
        print("Number of 1ª hidden layers: " + str(argv[2]))
        print("Number of 2ª hidden layers: " + str(argv[3]))
        print("Activation function 1º: " + str(argv[4]))
        print("Activation function 2º: " + str(argv[5]))
        print("Activation function Out layer: " + str(argv[6]))
        print("Learning Rate: " + str(argv[7]))
        print("Optimizer: " + str(argv[8]))
        print("Batch size: " + str(argv[9]))
        print("Epochs:     " + str(argv[10]))
        print("Simulation name:     " + str(argv[11]))
        print("Path:     " + str(argv[12]))


x_train, y_train = load_dataset(pd.read_csv('dataset/dense/train.csv', encoding='utf-8', delimiter=';', header=None))
x_test, y_test = load_dataset(pd.read_csv('dataset/dense/test.csv', encoding='utf-8', delimiter=';', header=None))

simulation_id = uuid.uuid4()
date = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
path = date + "___" + str(simulation_id)

SIMULATION_NAME = simulation_id if SIMULATION_NAME is None or '' else SIMULATION_NAME

print(str(argv))

setConfigurarion(argv)
os.makedirs(SIMULATION_PATH + "/" + path + "/")

print(configuration())

len_dataset = len(y_test) + len(y_train)
num_steps = int(len(y_test) / 2)
total_by_num_steps = len_dataset - (num_steps)


def mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100


def cal_diff_mape(y_real, y_pred):
    return np.abs((y_real - y_pred) / y_real)


def rmse(y_true, y_pred):
    return K.sqrt(K.mean(K.square(y_pred - y_true), axis=-1))


base_treinamento = x_train
base_treinamento_y = y_train
normalizador_entrada = MinMaxScaler(feature_range=(0, 1))
normalizador_saida = MinMaxScaler(feature_range=(0, 1))

base_treinamento_normalizada = normalizador_entrada.fit_transform(
    base_treinamento)
base_treinamento_normalizada_y = normalizador_entrada.fit_transform(np.array(
    base_treinamento_y).reshape(-1, 1))  # normalizador.fit_transform(base_treinamento_y)

delimiter("PERCENT_START")  # start emit percent to AG

regressor = Sequential()

if NUMBER_OF_NINT is 1:
    regressor.add(Dense(units=NINT1, input_dim=NENT, activation=ACTIVATION_FUNCTION1))
    regressor.add(Dense(units=1, activation=ACTIVATION_FUNCTION_N1))

if NUMBER_OF_NINT is 2:
    regressor.add(Dense(units=NINT1, input_dim=NENT, activation=ACTIVATION_FUNCTION1))
    regressor.add(Dense(units=NINT2, activation=ACTIVATION_FUNCTION2))
    regressor.add(Dense(units=1, activation=ACTIVATION_FUNCTION_N1))

regressor.compile(optimizer=OPTIMIZER, loss='mean_squared_error',
                  metrics=[metrics.mean_absolute_error, metrics.mean_absolute_percentage_error, rmse, 'accuracy'])

regressor.fit(x_train, y_train,
              epochs=EPOCHS, batch_size=BATCH_SIZE, verbose=0, callbacks=[EPOCHS_PRINT_CALLBACK])

delimiter("PERCENT_END")  # end of emit percent to AG

base_test = x_test
base_test_y = y_test
base_test_normalizada = normalizador_entrada.fit_transform(base_test)
base_test_normalizada_y = normalizador_entrada.fit_transform(np.array(base_test_y).reshape(-1, 1))


eval = regressor.evaluate(x_test, y_test, batch_size=16, verbose=0)

print("metrics=[ 'mean_squared_error', 'mean_absolute_error', 'mean_absolute_percentage_error', 'root_mean_squared_error', 'accuracy' ")
print(str(eval))



print("TRAIN: ")
predictions = regressor.predict(x_train)
rounded = [x for x in predictions]
for i, predic in enumerate(rounded):
    print("{ 'PREDICTION': " + str(predic) + ", 'REAL': " + str(y_train.iloc[i]) + " }, ")

delimiter("EVALUATION_TRAIN_START")
emitter(write_evaluation(rounded, y_test.iloc))
delimiter("EVALUATION_TRAIN_END")


file = open(SIMULATION_PATH + "/" + path + '/result.txt', 'w')

print("TEST: ")
sum = 0
predictions = regressor.predict(x_test)
rounded = [x for x in predictions]
for i, predic in enumerate(rounded):
    file.write("{ 'PREDICTION': " + str(predic) + ", 'REAL': " + str(y_test.iloc[i]) + " }, ")
    sum += cal_diff_mape(y_test.iloc[i], predic)

mape = (100 * sum) / len(predictions)

delimiter("EVALUATION_TEST_START")
emitter(write_evaluation(rounded, y_test.iloc))
delimiter("EVALUATION_TEST_END")

todas_predicoes = np.concatenate((x_train, x_test), axis=None)
todos_precos_reais = np.concatenate((y_train, predictions), axis=None)

print("METRICS:")
print("metrics=[ 'mean_squared_error', 'mean_absolute_error', 'mean_absolute_percentage_error', 'root_mean_squared_error', 'accuracy' ")
metrics = {}
metrics['mean_squared_error'] = eval[0]
metrics['mean_absolute_error'] = eval[1]
metrics['mean_absolute_percentage_error'] = mape[0]
metrics['root_mean_squared_error'] = np.sqrt(eval[1])
metrics['accuracy'] = eval[4]
metrics['subject'] = NUMBER_OF_SUBJECT
metrics['path'] = SIMULATION_PATH + "/" + path

plt.figure(figsize=(16, 7))
plt.rcParams.update({'font.size': 22})
plt.plot(todos_precos_reais, color="#2ca02c", linewidth=4)
plt.plot(todas_predicoes, color="#1f77b4", linestyle='--', linewidth=4)
plt.legend(bbox_to_anchor=(1.01, 1), loc='upper left', borderaxespad=0.,
           handles=[mpatches.Patch(label="Real", color="green"), mpatches.Patch(label="Predict", color="blue")])
plt.xlabel('STEPS')
plt.title('total prediction of the subject ' + str(NUMBER_OF_SUBJECT) + '\n' + str(SIMULATION_NAME))
plt.tight_layout()
plt.savefig(SIMULATION_PATH + "/" + path + '/total_simulation.png', dpi=100, facecolor='w', edgecolor='w',
            orientation='portrait', papertype=None, format=None,
            transparent=False, bbox_inches=None, pad_inches=0.1,
            frameon=None, metadata=None)

plt.close()

plt.figure(figsize=(16, 7))
plt.rcParams.update({'font.size': 22})
# line1, = ax.plot(pred_teste, label='predito')
# line2, = ax.plot(lista_preco_real_test, label='real')

plt.plot(y_test, color="#2ca02c", marker="o", linewidth=4, markersize=10)
plt.plot(predictions, color="#1f77b4", linestyle='--', marker="8", linewidth=4, markersize=10)

plt.legend(bbox_to_anchor=(1.01, 1), loc='upper left', borderaxespad=0.,
           handles=[mpatches.Patch(label="Real", color="green"), mpatches.Patch(label="Predict", color="blue"),
                    mpatches.Patch(label="RMSE >> " + str(round(metrics['root_mean_squared_error'], 5)), color="white"),
                    mpatches.Patch(label="MAE  >> " + str(round(metrics['mean_absolute_error'], 5)), color="white"),
                    mpatches.Patch(label="MAPE >> " + str(round(metrics['mean_absolute_percentage_error'], 5)),
                                   color="white")])
plt.xlabel('Steps')
plt.title('prediction of the subject ' + str(NUMBER_OF_SUBJECT) + '\n' + str(SIMULATION_NAME))
plt.tight_layout()
plt.savefig(SIMULATION_PATH + "/" + path + '/train_simulation.png', dpi=100, facecolor='w', edgecolor='w',
            orientation='portrait', papertype=None, format=None,
            transparent=False, bbox_inches=None, pad_inches=0.1,
            frameon=None, metadata=None)
plt.close()

fig, ax = plt.subplots()
index = np.arange(1)

bar_width = 0.35
opacity = 0.4
error_config = {'ecolor': '0.3'}

ax.bar(index, metrics['root_mean_squared_error'], bar_width,
       alpha=opacity, color='b',
       error_kw=error_config,
       label='RMSE >> ' + str(round(metrics['root_mean_squared_error'], 5)))

ax.bar(index + bar_width, metrics['mean_absolute_error'], bar_width,
       alpha=opacity, color='r',
       error_kw=error_config,
       label='MAE   >> ' + str(round(metrics['mean_absolute_error'], 5)))

ax.bar(index + 2 * bar_width, metrics['mean_absolute_percentage_error'], bar_width,
       alpha=opacity, color='g',
       error_kw=error_config,
       label='MAPE >> ' + str(round(metrics['mean_absolute_percentage_error'], 5)))

plt.rcParams.update({'font.size': 16})
ax.set_title('scores of the subject ' + str(NUMBER_OF_SUBJECT) + '\n' + SIMULATION_NAME)
plt.xticks([index, index + bar_width, index + 2 * bar_width],
           ["RMSE", "MAE", "MAPE"])
ax.legend()

fig.tight_layout()
plt.tight_layout()
plt.savefig(SIMULATION_PATH + "/" + path + '/scores_simulation.png', dpi=100, facecolor='w', edgecolor='w',
            orientation='portrait', papertype=None, format=None,
            transparent=False, bbox_inches=None, pad_inches=0.1,
            frameon=None, metadata=None)
plt.close()

# serialize model to JSON
model_json = regressor.to_json()
with open(SIMULATION_PATH + "/" + path + "/model.json", "w") as json_file:
    json_file.write(model_json)

# serialize weights to HDF5
regressor.save_weights(SIMULATION_PATH + "/" + path + "/model.h5")

print("saved model to disk")

delimiter("METRICS_START")  # start emit metrics to AG

emitter(str(metrics))
with open(SIMULATION_PATH + "/" + path + "/metrics.txt", "w") as file:
    file.write(str(metrics))

delimiter("METRICS_END")  # start emit metrics to AG

with open(SIMULATION_PATH + "/" + path + "/weights_list.json", "w") as file:
    file.write(str(np.array(regressor.get_weights())))

with open(SIMULATION_PATH + "/" + path + "/configurations.txt", "w") as file:
    file.write(str(json.dumps(configuration())))

try:
    cmd = ' '.join(["c_exec\\executavel.exe " if platform != "linux" else "c_exec/executavel", str(NENT), str(1), str(int(NUMBER_OF_NINT) + 2), str(NINT1), str(NINT2)])
    cmd_out = os.popen(cmd).read()
    with open(SIMULATION_PATH + "/" + path + "/genotype.txt", "w") as file:
        file.write(str(cmd_out))

except TypeError:
    print("\n\n ERROR_CMD_TYPE \n\n")
    # exit(0)


exit(0)
