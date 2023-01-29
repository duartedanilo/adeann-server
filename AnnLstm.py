from Ann import Ann
from helpers import *

import os
import uuid

import pandas as pd
from datetime import datetime
from sys import platform
from sklearn.preprocessing import MinMaxScaler
import numpy as np

from keras import metrics
from keras.layers import Dense, LSTM
from keras.models import Sequential
from keras.callbacks import LambdaCallback

import matplotlib.patches as mpatches
import matplotlib.pyplot as plt


class AnnLstm(Ann):
    def run(self):
        NUMBER_OF_SUBJECT = 0
        SIMULATION_NAME = 'simulation_name'
        SIMULATION_PATH = 'simulations'

        EPOCHS_PRINT_CALLBACK = LambdaCallback(
            on_epoch_end=lambda epoch, logs: writePercentFeedback(str(epoch)))

        x_train, y_train = load_dataset(
            pd.read_csv('dataset/lstm/train.csv', encoding='utf-8', delimiter=';', header=None))
        x_test, y_test = load_dataset(
            pd.read_csv('dataset/lstm/test.csv', encoding='utf-8', delimiter=';', header=None))

        simulation_id = uuid.uuid4()
        date = datetime.now().strftime("%d-%m-%Y_%H-%M-%S")
        path = date + "___" + str(simulation_id)

        SIMULATION_NAME = simulation_id if SIMULATION_NAME is None or '' else SIMULATION_NAME

        # print(str(argv))

        os.makedirs(SIMULATION_PATH + "/" + path + "/")

        # print(configuration())

        len_dataset = len(y_test) + len(y_train)
        num_steps = int(len(y_test) / 2)
        total_by_num_steps = len_dataset - (num_steps)

        base_treinamento = x_train
        base_treinamento_y = y_train
        normalizador_entrada = MinMaxScaler(feature_range=(0, 1))
        normalizador_saida = MinMaxScaler(feature_range=(0, 1))

        base_treinamento_normalizada = normalizador_entrada.fit_transform(
            base_treinamento)
        base_treinamento_normalizada_y = normalizador_entrada.fit_transform(np.array(
            base_treinamento_y).reshape(-1, 1))  # normalizador.fit_transform(base_treinamento_y)

        # np.ndarray(shape=(381-90,90,5))
        previsores = np.arange(total_by_num_steps * num_steps * self.NENT)
        # np.ndarray(shape=(381-90,1,5))
        preco_real = np.arange(total_by_num_steps * 1 * 1)
        previsores = previsores.reshape(total_by_num_steps, num_steps, self.NENT)
        preco_real = preco_real.reshape(total_by_num_steps, 1)

        lista_previsores = []
        lista_preco_real = []

        for i in range(num_steps, total_by_num_steps - num_steps):
            lista_previsores.append(base_treinamento_normalizada[i - num_steps:i, :])
            lista_preco_real.append(base_treinamento_normalizada_y[i])

        lista_previsores, lista_preco_real = np.array(
            lista_previsores), np.array(lista_preco_real)

        # padrão (batch_size, timestep, column)

        lista_previsores = np.reshape(lista_previsores,
                                      (lista_previsores.shape[0], lista_previsores.shape[1], self.NENT))

        delimiter("PERCENT_START")  # start emit percent to AG

        regressor = Sequential()

        first_layer = self.topology[0]

        regressor.add(LSTM(units=first_layer['neurons'], return_sequences=False,
                           input_shape=(lista_previsores.shape[1], self.NENT),
                           activation=first_layer['activation_fnc']))

        for layer in self.topology[1:-1]:
            regressor.add(LSTM(units=layer['neurons'], return_sequences=False, activation=layer['activation_fnc']))

        last_layer = self.topology[-1]
        regressor.add(Dense(units=last_layer['neurons'], activation=last_layer['activation_fnc']))

        regressor.compile(optimizer=self.OPTIMIZER, loss='mean_squared_error',
                          metrics=[metrics.mean_absolute_error, metrics.mean_absolute_percentage_error, rmse,
                                   'accuracy'])

        # treinamento
        regressor.fit(lista_previsores, lista_preco_real,
                      epochs=self.epochs, batch_size=self.BATCH_SIZE, verbose=0, callbacks=[EPOCHS_PRINT_CALLBACK])

        delimiter("PERCENT_END")  # end of emit percent to AG

        base_test = x_test
        base_test_y = y_test
        base_test_normalizada = normalizador_entrada.fit_transform(base_test)
        base_test_normalizada_y = normalizador_entrada.fit_transform(
            np.array(base_test_y).reshape(-1, 1))

        lista_previsores_test = []
        lista_preco_real_test = []

        for i in range(0, num_steps):
            lista_previsores_test.append(base_test_normalizada[i:num_steps + i, :])
            lista_preco_real_test.append(base_test_normalizada_y[num_steps + i])

        lista_previsores_test, lista_preco_real_test = np.array(
            lista_previsores_test), np.array(lista_preco_real_test)

        # padrão (batch_size, timestep, column)

        lista_previsores_test = np.reshape(
            lista_previsores_test, (lista_previsores_test.shape[0], lista_previsores_test.shape[1], self.NENT))

        #
        eval = regressor.evaluate(lista_previsores_test,
                                  lista_preco_real_test, batch_size=16, verbose=0)

        # writeHistory(str(eval))

        print("PREV")
        print(
            "metrics=[ 'mean_squared_error', 'mean_absolute_error', 'mean_absolute_percentage_error', 'root_mean_squared_error', 'accuracy' ")
        print(str(eval))

        pred_treino = regressor.predict(lista_previsores)
        pred_treino = normalizador_entrada.inverse_transform(pred_treino)
        lista_preco_real = normalizador_entrada.inverse_transform(lista_preco_real)

        pred_teste = regressor.predict(lista_previsores_test)
        pred_teste = normalizador_entrada.inverse_transform(pred_teste)
        lista_preco_real_test = normalizador_entrada.inverse_transform(
            lista_preco_real_test)

        todas_predicoes = np.concatenate((pred_treino, pred_teste), axis=None)
        todos_precos_reais = np.concatenate(
            (lista_preco_real, lista_preco_real_test), axis=None)

        print("TRAIN: ")
        for i in range(len(lista_preco_real)):
            print("{ 'PREDICTION': " + str(pred_treino[i]) + ", 'REAL': " + str(lista_preco_real[i]) + " }, ")

        delimiter("EVALUATION_TRAIN_START")
        # print(write_evaluation(pred_treino, lista_preco_real))
        delimiter("EVALUATION_TRAIN_END")

        sum = 0
        file = open(SIMULATION_PATH + "/" + path + '/result.txt', 'w')

        print("TEST: ")

        for i in range(len(lista_preco_real_test)):
            file.write(
                "{ 'PREDICTION': " + str(pred_teste[i]) + ",  'REAL': " + str(lista_preco_real_test[i]) + " },\n")
            sum += cal_diff_mape(lista_preco_real_test[i], pred_teste[i])

        mape = (100 * sum) / len(lista_preco_real_test)

        delimiter("EVALUATION_TEST_START")
        # emitter(write_evaluation(pred_teste, lista_preco_real_test))
        delimiter("EVALUATION_TEST_END")

        print("METRICS:")
        print(
            "metrics=[ 'mean_squared_error', 'mean_absolute_error', 'mean_absolute_percentage_error', 'root_mean_squared_error', 'accuracy' ")
        metricas = {}
        metricas['mean_squared_error'] = eval[0]
        metricas['mean_absolute_error'] = eval[1]
        metricas['mean_absolute_percentage_error'] = mape[0]
        metricas['root_mean_squared_error'] = np.sqrt(eval[1])
        metricas['accuracy'] = eval[4]
        metricas['subject'] = NUMBER_OF_SUBJECT
        metricas['path'] = SIMULATION_PATH + "/" + path

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

        plt.plot(lista_preco_real_test, color="#2ca02c", marker="o", linewidth=4, markersize=10)
        plt.plot(pred_teste, color="#1f77b4", linestyle='--', marker="8", linewidth=4, markersize=10)

        plt.legend(bbox_to_anchor=(1.01, 1), loc='upper left', borderaxespad=0.,
                   handles=[mpatches.Patch(label="Real", color="green"), mpatches.Patch(label="Predict", color="blue"),
                            mpatches.Patch(label="RMSE >> " + str(round(metricas['root_mean_squared_error'], 5)),
                                           color="white"),
                            mpatches.Patch(label="MAE  >> " + str(round(metricas['mean_absolute_error'], 5)),
                                           color="white"),
                            mpatches.Patch(label="MAPE >> " + str(round(metricas['mean_absolute_percentage_error'], 5)),
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

        ax.bar(index, metricas['root_mean_squared_error'], bar_width,
               alpha=opacity, color='b',
               error_kw=error_config,
               label='RMSE >> ' + str(round(metricas['root_mean_squared_error'], 5)))

        ax.bar(index + bar_width, metricas['mean_absolute_error'], bar_width,
               alpha=opacity, color='r',
               error_kw=error_config,
               label='MAE   >> ' + str(round(metricas['mean_absolute_error'], 5)))

        ax.bar(index + 2 * bar_width, metricas['mean_absolute_percentage_error'], bar_width,
               alpha=opacity, color='g',
               error_kw=error_config,
               label='MAPE >> ' + str(round(metricas['mean_absolute_percentage_error'], 5)))

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

        print(str(metricas))
        with open(SIMULATION_PATH + "/" + path + "/metrics.txt", "w") as file:
            file.write(str(metricas))

        delimiter("METRICS_END")  # start emit metrics to AG

        with open(SIMULATION_PATH + "/" + path + "/weights_list.json", "w") as file:
            file.write(str(np.array(regressor.get_weights())))

        # with open(SIMULATION_PATH + "/" + path + "/configurations.txt", "w") as file:
        #     file.write(str(json.dumps(configuration())))

        try:
            cmd = ' '.join(
                ["c_exec\\executavel.exe " if platform != "linux" else "c_exec/executavel", str(self.NENT), str(1),
                 str(len(self.topology) + 1)])
            cmd_out = os.popen(cmd).read()
            with open(SIMULATION_PATH + "/" + path + "/genotype.txt", "w") as file:
                file.write(str(cmd_out))

        except TypeError:
            print("\n\n ERROR_CMD_TYPE \n\n")
            # exit(0)
