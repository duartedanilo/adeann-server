import keras.backend as K
from keras.optimizers import Adam, RMSprop, SGD
import numpy as np

def writePercentFeedback(percent):
    print(percent + "%")
    with open('simulations' + "/" + "subject_percent.log", "w") as file:
        file.write(percent + "%")

def adamOptimizerFunction(lr):
    return Adam(lr=lr)

def rmspropOptimizerFunction(lr):
    return RMSprop(lr=lr)

def sgdOptimizerFunction(lr):
    return SGD(lr=lr)

def load_dataset(dataset):
    data = dataset
    data_y = data.iloc[:, -1]
    data_x = data.iloc[:, :-1]
    return data_x, data_y

def delimiter(type="@@@@@@@"):
    print("@@@@@@@@@@" + type + "@@@@@@@@@@")

def cal_diff_mape(y_real, y_pred):
    return np.abs((y_real - y_pred) / y_real)

def rmse(y_true, y_pred):
    return K.sqrt(K.mean(K.square(y_pred - y_true), axis=-1))