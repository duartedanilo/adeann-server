# python adeann.py minha_simulacao jherson 4 3 66 166 1 tanh 0.001 rmsprop 32 3 python
# python adeann.py minha_simulacao jherson 4 3 77 177 66 166 2 tanh tanh 0.001 rmsprop 32 3 python
# DEBUG = True

import json
import os
import numpy as np
import uuid
from datetime import datetime
from sys import argv
from itertools import count

# ALGORITMO GENÉTICO
GERACAO = 4
INDIVIDUOS = 3
GENE = 516
NINTER = 10000

# REDE NEURAL
TIPO = 4
N = 4
NINT = 4
NINT1 = 7
NINT2 = 7
NENT = 5
NSAI = 1

MAXITER = 10  # Numero de Epocas

CONTID = 0
CONTREGRASVAL = 0
INDIC = 0
SUP = 0

# TAXAS
ERR = 0.0
EMQ = 0.0
FITNESS = 0.0
AUX = 0
SOMA_NINT_TOTAL = 0

# CONSTANTES
FIT = 0
HIST_FIT = []

for i in range(0, GERACAO):
    HIST_FIT.append([])

tab_converte = ['f', 'F', 'n', '.', 'n', '.', 'f', 'F', 'F', 'f', 'B', 'f', '[', 'n', '[', '.',
                'f', ']', 'n', '*', '.', 'F', 'f', 'F', ']', '.', '[', 'f', 'f', '*', 'B', ']',
                '.', ']', 'n', 'F', 'f', 'B', 'f', 'B', 'F', '[', 'B', 'n', '*', 'f', '.', ']',
                ']', '[', 'n', 'F', 'n', 'B', '[', '.', 'f', ']', 'B', 'F', 'B', 'f', '*', '[']

# ADEAN PARAMETES

RN_REFERENCE = 'ann.py'
PYTHON_INTERPRETER = 'python'
SIMULATION_NAME = ''
USERNAME = ''
GENERATIONS = 4
SUBJECTS = 3
MIN_NINT1 = 80
MAX_NINT1 = 100
MIN_NINT2 = 80
MAX_NINT2 = 100
SIMULATION_ID = uuid.uuid4()
PATH = datetime.now().strftime("%d-%m-%Y_%H-%M-%S") + "___" + str(SIMULATION_ID)

# RN PARAMETER
NUMBER_OF_NINT = 1
NINT1 = 100
NINT2 = 100

LEARNING_RATE = 0.001
ACTIVATION_FUNCTION1 = 'tanh'  # linear /
ACTIVATION_FUNCTION2 = 'tanh'

OPTIMIZER = 'rmsprop'

BATCH_SIZE = 32
EPOCHS = 10000
NUMBER_OF_SUBJECT = 0




fileWriter = lambda _: _


subject_count = lambda c=count(): next(c)


def getArgs(arg, reference):
    return arg if arg is not None else reference


def setConfigurarion(argv):
    global SIMULATION_NAME, USERNAME, GENERATIONS, SUBJECTS, MIN_NINT1, MAX_NINT1, MIN_NINT2, MAX_NINT2, NUMBER_OF_NINT, NINT1, NINT2, ACTIVATION_FUNCTION1, ACTIVATION_FUNCTION2, LEARNING_RATE, OPTIMIZER, BATCH_SIZE, EPOCHS, PYTHON_INTERPRETER
    global PATH, fileWriter

    if len(argv) < 16:
        SIMULATION_NAME = getArgs(str(argv[1]), SIMULATION_NAME)
        USERNAME = getArgs(str(argv[2]), USERNAME)
        GENERATIONS = getArgs(str(argv[3]), GENERATIONS)
        SUBJECTS = getArgs(str(argv[4]), SUBJECTS)
        MIN_NINT1 = getArgs(str(argv[5]), MIN_NINT1)
        MAX_NINT1 = getArgs(str(argv[6]), MAX_NINT1)
        NUMBER_OF_NINT = "1"
        ACTIVATION_FUNCTION1 = getArgs(str(argv[8]), ACTIVATION_FUNCTION1)
        LEARNING_RATE = (getArgs(str(argv[9]), LEARNING_RATE))
        OPTIMIZER = getArgs(str(argv[10]), OPTIMIZER)
        BATCH_SIZE = getArgs(str(argv[11]), BATCH_SIZE)
        EPOCHS = getArgs(str(argv[12]), EPOCHS)
        try:
            PYTHON_INTERPRETER = getArgs(str(argv[13]), PYTHON_INTERPRETER)
        except:
            pass

    else:
        SIMULATION_NAME = getArgs(str(argv[1]), SIMULATION_NAME)
        USERNAME = getArgs(str(argv[2]), USERNAME)
        GENERATIONS = getArgs(str(argv[3]), GENERATIONS)
        SUBJECTS = getArgs(str(argv[4]), SUBJECTS)
        MIN_NINT1 = getArgs(str(argv[5]), MIN_NINT1)
        MAX_NINT1 = getArgs(str(argv[6]), MAX_NINT1)
        MIN_NINT2 = getArgs(str(argv[7]), MIN_NINT2)
        MAX_NINT2 = getArgs(str(argv[8]), MAX_NINT2)
        NUMBER_OF_NINT = "2"
        ACTIVATION_FUNCTION1 = getArgs(str(argv[10]), ACTIVATION_FUNCTION1)
        ACTIVATION_FUNCTION2 = getArgs(str(argv[11]), ACTIVATION_FUNCTION2)
        LEARNING_RATE = getArgs(str(argv[12]), LEARNING_RATE)
        OPTIMIZER = getArgs(str(argv[13]), OPTIMIZER)
        BATCH_SIZE = getArgs(str(argv[14]), BATCH_SIZE)
        EPOCHS = getArgs(str(argv[15]), EPOCHS)

        try:
            PYTHON_INTERPRETER = getArgs(str(argv[16]), PYTHON_INTERPRETER)
        except:
            pass

    if not os.path.exists("simulations"): os.mkdir("simulations")
    PATH = "simulations/" + PATH + "___" + SIMULATION_NAME
    os.mkdir(PATH)
    if not os.path.exists("users"): os.mkdir("users")
    open("users/" + USERNAME + ".log", "a").write(PATH + "\n")
    fileWriter = open(PATH + "/relat_simulation.txt", "w")


def argsFormatted():
    numberOfHiddenLayers = len(argv) < 17

    if numberOfHiddenLayers:
        print("Simulation name: " + str(argv[1]))
        print("Username: " + str(argv[2]))
        print("Generations: " + str(argv[3]))
        print("Subjects: " + str(argv[4]))
        print("Min NINT1: " + str(argv[5]))
        print("Max NINT1: " + str(argv[6]))
        print("Number of hidden layers]: " + str(argv[7]))
        print("Activation function 1º: " + str(argv[8]))
        print("Learning Rate: " + str(argv[9]))
        print("Optimizer: " + str(argv[10]))
        print("Batch size: " + str(argv[11]))
        print("Epochs:     " + str(argv[12]))
        try:
          print("Interpreter:     " + str(argv[13]))
        except e:
            pass

    else:
        print("Simulation name: " + str(argv[1]))
        print("Username: " + str(argv[2]))
        print("Generations: " + str(argv[3]))
        print("Subjects: " + str(argv[4]))
        print("Min NINT1: " + str(argv[5]))
        print("Max NINT1: " + str(argv[6]))
        print("Min NINT2: " + str(argv[7]))
        print("Max NINT2: " + str(argv[8]))
        print("Number of hidden layers]: " + str(argv[9]))
        print("Activation function 1º: " + str(argv[10]))
        print("Activation function 2º: " + str(argv[11]))
        print("Learning Rate: " + str(argv[12]))
        print("Optimizer: " + str(argv[13]))
        print("Batch size: " + str(argv[14]))
        print("Epochs:     " + str(argv[15]))
        try:
          print("Interpreter:     " + str(argv[16]))
        except e:
            pass


def getArgs(arg, reference):
    return arg if arg is not None else reference


def writer(kwargs):
    fileWriter.write(kwargs)


def writePercentFeedback(percent, generation = ""):
    global PATH
    with open(PATH+"/subject_percent.log", "w") as file:
        file.write(str("0.0%"))
    with open(PATH+"/population_percent.log", "w") as file:
        file.write(str(percent))
    with open(PATH+"/generation_percent.log", "w") as file:
        file.write(str(generation))


def mean_absolute_percentage_error(y_true, y_pred):
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100


def cal_diff_mape(y_real, y_pred):
    return np.abs((y_real - y_pred) / y_real)


def zerar_fitness(fit):
    fit = np.zeros(INDIVIDUOS * GENE)
    fit.shape = (INDIVIDUOS, GENE)
    return fit


def imprime_hist_fitness(hist_fit, file, contador):
    # imprimir no txt
    writer("\n" + str(contador))
    writer("\t\t" + str(hist_fit[contador - 1][0]))
    writer("\t\t" + str(hist_fit[contador - 1][1]))


def genotipo_estatico(individuos, gene):
    gen = np.zeros(individuos * gene)
    gen.shape = (individuos, gene)
    for i in range(0, gene):
        for j in range(0, individuos):
            gen[i][j] = np.random.random_integers(0, 1, 1)[0]
    return gen


def genotipo_dinamico(individuos, gene):
    writer(str(gene) + " - " + str(gene))
    gene = int(gene)
    gen = np.zeros(individuos * gene)
    gen.shape = (individuos, gene)

    for i in range(0, individuos):
        for j in range(0, gene):
            gen[i][j] = np.random.random_integers(0, 1, 1)[0]

    return gen


def gen_bin_dec_genotipo_dinamico(individuos, gene_dec):
    gen_dec = np.zeros(individuos * gene_dec)
    gen_dec.shape = (individuos, gene_dec)
    return gen_dec


def genotipo_dinamico_string(individuos, gene_dec):
    writer(str(gene_dec))
    gene_dec = int(gene_dec)
    gen_string = np.chararray(individuos * (gene_dec + 1))
    gen_string.shape = (individuos, gene_dec + 1)
    return gen_string


def imprime_genbin(gen, individuos, gene, file):
    writer(str("\n"))
    for i in range(0, individuos):
        for j in range(0, gene):
            # writer(str(gen[i][j])) <<-------- zeros e uns
            writer(str(gen[i][j]))
    return gen


def imprime_genbindec(gen_bin_dec, individuos, gene_dec):
    writer("\n")
    gene_dec = int(gene_dec)
    for i in range(0, individuos):
        writer("\n-Individuo[" + str(i + 1) + "]-\n")

        for j in range(0, gene_dec):
            writer("\t" + str(gen_bin_dec[i][j]))
    writer("\n\n\n")
    return gen_bin_dec


def imprime_genstring(gen_string, individuos, gene_dec, geracao, file):
    global GERACAO, INDIVIDUOS, CONTID, INDIC, FIT
    for i in range(0, individuos):
        writer("\n-Individuo[" + str(i + 1) + "]-\n")
        writePercentFeedback(str(subject_count() + 1) + "-" + str(GERACAO * INDIVIDUOS), str(geracao) + "-" + str(GERACAO))
        for j in range(0, gene_dec):
            writer(str(gen_string[i][j]))
        CONTID += 1
        if gen_string[i][gene_dec] is b'V':
            writer("\t STRING VALIDA")
            mapeamento_genotipo_fenotipo(NENT, NSAI, 0, TIPO, file)  # 0 -> aleatorio
        else:
            FIT[INDIC][0] = INDIC + 1
            FIT[INDIC][1] = 0.0
            FIT[INDIC][2] = FIT[INDIC][0]
            FIT[INDIC][3] = INDIC + 1
            if INDIC >= 1:
                FIT[INDIC][3] = INDIC + 1 + FIT[INDIC - 1][3]
            else:
                FIT[INDIC][3] = INDIC + 1
            FIT[INDIC][4] = 0.0
            FIT[INDIC][5] = 0.0
            FIT[INDIC][6] = 0.0
            INDIC += 1
            writer("\t STRING INVALIDA")
    return FIT


def legenes_genbin(gen, gen_bin_dec, individuos, gene):
    # gene1, gene2, gene3, gene4, gene5, gene6, i;
    start = 0
    j = 0
    compactador = 0
    stop = int(gene / 6)

    while j < individuos:
        for i in range(0, stop):
            gene1 = gen[j][start]
            gene2 = gen[j][start + 1]
            gene3 = gen[j][start + 2]
            gene4 = gen[j][start + 3]
            gene5 = gen[j][start + 4]
            gene6 = gen[j][start + 5]
            decimal = converte_genbindec(gene1, gene2, gene3, gene4, gene5, gene6, j, compactador)
            gen_bin_dec[j][compactador] = decimal
            compactador += 1
            start = start + 6
        j += 1
        start = 0
        compactador = 0


def converte_genbindec(gene1, gene2, gene3, gene4, gene5, gene6, j, compactador):
    decimal = gene6 * 32 + gene5 * 16 + gene4 * 8 + gene3 * 4 + gene2 * 2 + gene1
    return decimal


def legenes_genbindec_string(gen_bin_dec, gen_string, individuos, gene_dec):
    for j in range(0, individuos):
        for i in range(0, gene_dec):
            gen_string[j][i] = tab_converte[int(gen_bin_dec[j][i])]

    return gen_string


def avalia_regras_gen_string(gen_string, individuos, gene_dec):
    string_val = [b'.', b'f', b'[', b'F', b'f', b'n', b'B', b']']
    for j in range(0, individuos - 1):
        for i in range(0, gene_dec - 7):
            # Le do inicio para o final com um passo de um bit.
            if (gen_string[j][i] is b'.') and (gen_string[j][i + 1] is b'f') and (gen_string[j][i + 2] is b'[') and (
                    gen_string[j][i + 3] is b'F') and (gen_string[j][i + 4] is b'f') and (
                    gen_string[j][i + 5] is b'n') and (gen_string[j][i + 6] is b'B') and (gen_string[j][i + 7] is b']'):
                gen_string[j][gene_dec] = b'V'

    for j in range(0, individuos - 1):
        # Le do final para o inicio com um passo de um bit.
        for i in range(gene_dec - 1, 6, -1):
            if (gen_string[j][i] is b'.') and (gen_string[j][i + 1] is b'f') and (gen_string[j][i + 2] is b'[') and (
                    gen_string[j][i + 3] is b'F') and (gen_string[j][i + 4] is b'f') and (
                    gen_string[j][i + 5] is b'n') and (gen_string[j][i + 6] is b'B') and (gen_string[j][i + 7] is b']'):
                gen_string[j][gene_dec] = b'V'

    for j in range(0, individuos - 1):
        # Le de forma sequencial bit a bit do inicio para o fim.
        cont_elem = 0
        pos_string = 0

        for i in range(0, gene_dec - 1):
            carac = gen_string[j][i]

            if not (cont_elem >= 8):
                if string_val[pos_string] is carac:
                    cont_elem += 1
                    pos_string += 1

            if cont_elem is 8:
                gen_string[j][gene_dec] = b'V'

    return gen_string


def mapeamento_genotipo_fenotipo(NENT, NSAI, aleatorio, TIPO, file):
    global NINT, NINT1, NINT2, MIN_NINT1, MAX_NINT1, MIN_NINT2, MAX_NINT2

    N_TIPO = np.random.random_integers(int(MIN_NINT1), int(MAX_NINT1), 1)[0]

    NINT = N_TIPO
    NINT1 = N_TIPO
    NINT2 = np.random.random_integers(int(MIN_NINT2), int(MAX_NINT2), 1)[0]

    NINT_N3 = np.zeros(1)
    NINT_N3[0] = NINT1

    NINT_N4 = np.zeros(2)
    NINT_N4[0] = NINT1
    NINT_N4[1] = NINT2

    try:
        cmd = "c_exec\\executavel.exe " + str(NENT) + " " + str(NSAI) + " " + str(N) + " " + str(NINT1) + " " + str(
            NINT2) + " "
        cmd_out = os.popen(cmd).read()
        writer(str(cmd_out))
    except TypeError:
        print("\n\n ERROR_CMD_TYPE \n\n")
        exit(0)

    if N is 3:
        treina_rede(CONTID, file, NINT)
    if N is 4:
        treina_rede_(CONTID, file, NINT1, NINT2)


def NR_RAND(int):
    pass


def treina_rede(individuos, file, NINT):
    pass


def treina_rede_(contind, file, NINT1, NINT2):
    global EMQ, FITNESS, INDIC, NENT, NINT, NSAI, N, MAXITER, metrics, CONTID, lista_preco_real
    global PYTHON_INTERPRETER, RN_REFERENCE, NUMBER_OF_NINT, ACTIVATION_FUNCTION1, ACTIVATION_FUNCTION2, LEARNING_RATE, OPTIMIZER, BATCH_SIZE, EPOCHS, SIMULATION_NAME, PATH

    try:
        # cmd = "python lstm_args_2.py 2 100 200 tanh tanh 0.001 rmsprop 32 3 132132132 " + str(SIMULATION_NAME) + " " + str(PATH)


        cmd = ' '.join([PYTHON_INTERPRETER, RN_REFERENCE, NUMBER_OF_NINT, str(NINT1), str(NINT2 if NUMBER_OF_NINT is "2" else ""), ACTIVATION_FUNCTION1, str( ACTIVATION_FUNCTION2 if NUMBER_OF_NINT is "2" else ""), LEARNING_RATE, OPTIMIZER, BATCH_SIZE, EPOCHS, str(CONTID), SIMULATION_NAME, PATH])
        cmd_out = os.popen(cmd).read()

        string_builder = lambda type: "@@@@@@@@@@" + type + "@@@@@@@@@@"

        metrics_start_match = string_builder("METRICS_START")
        metrics_end_match = string_builder("METRICS_END")
        evaluation_test_start_match = string_builder("EVALUATION_TEST_START")
        evaluation_test_end_match = string_builder("EVALUATION_TEST_END")

        writer("METRICS")
        metrics = json.loads(cmd_out[cmd_out.index(metrics_start_match) + len(metrics_start_match): cmd_out.index(
            metrics_end_match)].replace("'", "\""))

        metricas = metrics

        writer("EVALUATION")
        pred_test_evaluation = cmd_out[cmd_out.index(evaluation_test_start_match) + len(
            evaluation_test_start_match): cmd_out.index(evaluation_test_end_match)].replace("'", "\"")

        writer(pred_test_evaluation)

    except TypeError:
        print("\n\n ERROR_CMD_TYPE \n\n")
        exit(0)

    EMQ = metricas['mean_squared_error']
    MAE = metricas['mean_absolute_error']
    MAPE = metricas['mean_absolute_percentage_error']
    RMSE = metricas['root_mean_squared_error']
    FITNESS = metricas['accuracy']

    writer("\nemq>> " + str(EMQ))
    writer("\nmae>> " + str(MAE))
    writer("\nmape>> " + str(MAPE))
    writer("\nrmse>> " + str(RMSE))
    writer("\nfitness>> " + str(FITNESS))
    writer("\n\n<<Pesos Camada Entrada Oculta>>\n")

    # nova fitness
    FIT[INDIC][0] = INDIC + 1
    FIT[INDIC][1] = FITNESS
    FIT[INDIC][2] = FIT[INDIC][0]
    FIT[INDIC][3] = INDIC + 1
    if INDIC + 1 > 1:
        FIT[INDIC][3] = INDIC + 1 + FIT[INDIC - 1][3]
    else:
        FIT[INDIC][3] = INDIC + 1
    FIT[INDIC][4] = EMQ
    FIT[INDIC][5] = NINT
    FIT[INDIC][6] = NINT1 + NINT2 + NENT + NSAI
    if N is 4:
        FIT[INDIC][7] = NINT2

    INDIC += 1
    writer("\nemq>> " + str(EMQ))
    writer("\nfitness>> " + str(FITNESS))
    writer("\n\n<<Pesos Camada Entrada Oculta>>\n")


def zera_fitness(fit):
    fit = np.zeros(INDIVIDUOS * GENE)
    fit.shape = (INDIVIDUOS, GENE)
    return fit


def ordena(FIT, file):
    global m
    m = 0
    for i in range(0, INDIVIDUOS - 1):
        m = i
        for j in range(i + 1, INDIVIDUOS):
            aux1 = FIT[j][1]
            aux2 = FIT[m][1]
            if aux1 > aux2:
                m = j

        ch = FIT[i][0]
        ch1 = FIT[i][1]
        ch2 = FIT[i][4]
        ch3 = FIT[i][5]
        ch4 = FIT[i][6]
        ch5 = FIT[m][0]
        FIT[i][0] = ch5
        FIT[i][1] = FIT[m][1]
        FIT[i][4] = FIT[m][4]
        FIT[i][5] = FIT[m][5]
        FIT[i][6] = FIT[m][6]
        FIT[m][0] = ch
        FIT[m][1] = ch1
        FIT[m][4] = ch2
        FIT[m][5] = ch3
        FIT[m][6] = ch4


def main():
    file = ''
    global FIT, HIST_FIT, MAXITER, INDIC
    # fileWriter = fopen("relat_autoMaasd2asdasd.txt", "w");
    for n in range(4, 4):

        if (n is 3):
            pass
            # fileWriter = fopen("relat_N3asdas.txt", "w");
        else:
            pass
            # fprintf(fileWriter, "\nTARP1 %.2f\nTARP2 %.2f\n\n\n");

    # gene : represneta o numero de genes por inidividuo, nesse caso 516;
    gene_dec = int(GENE / 6)  # //43+1=44 ultimo elemento armazena status da string valida % = valida;

    # //////    printf("Gerando Genotipo Aleatoriamente!\n");
    gen_bin = genotipo_dinamico(INDIVIDUOS, GENE)
    gen_bin_dec = genotipo_dinamico(INDIVIDUOS, gene_dec)
    gen_string = genotipo_dinamico_string(INDIVIDUOS, gene_dec)

    FIT = zera_fitness(FIT)
    contador = 1  # //contador do numero de geracoes
    global contador1
    contador1 = 0
    # //int pontos_corte=(gene_dec*0.9);

    while contador <= GERACAO:

        imprime_genbin(gen_bin, INDIVIDUOS, GENE, file)
        legenes_genbin(gen_bin, gen_bin_dec, INDIVIDUOS, GENE)
        imprime_genbindec(gen_bin_dec, INDIVIDUOS, gene_dec)
        legenes_genbindec_string(gen_bin_dec, gen_string, INDIVIDUOS, gene_dec)
        contador1 = 1  # //contador do sumero de cruzamentos por gera??o
        FIT = zera_fitness(FIT)
        gen_string = avalia_regras_gen_string(gen_string, INDIVIDUOS, gene_dec)  # //Avalia Regras Validas
        imprime_genstring(gen_string, INDIVIDUOS, gene_dec, contador, file)  # //Imprime Individuo[i] e DNA
        # //Ordenar Individuos
        ordena(FIT, file)
        # //Imprimir Individuos

        imprime_fitness(FIT, file, contador)
        contador += 1
        INDIC = 0
        while contador1 <= (gene_dec * 0.8):
            # realiza (individuos/2) cruzamentos
            gen_bin = selecao(gen_bin, gen_string, gene_dec)
            contador1 += 1

        contador1 = 1
        while contador1 <= (gene_dec * 0.8):
            # //516-86-14
            gen_bin = mutacao(gen_bin)
            contador1 += 1
        # // transloca(gen_string,gene_dec);

        if GERACAO < 20:
            MAXITER = MAXITER + 5
        elif (GERACAO >= 20) and (GERACAO < 40):
            MAXITER = MAXITER + 10
        else:
            MAXITER = MAXITER + 2

    contador = 1

    imprime_cabec(file)
    while GERACAO >= contador:
        imprime_hist_fitness(HIST_FIT, file, contador)
        contador += 1

    # //End Do

    print("\n\n<<Simulacao Concluida - Relatorio Gerado!!>>")
    writer("\nsimulacao concluida")


def selecao(gen, gen_string, gene_dec):
    global FIT, e5

    e1 = 0
    e = 0
    j = INDIVIDUOS - 1

    while e == e1:
        e = np.random.random_integers(0, 1, 1)[0]
        e2 = int(FIT[e][1])

        e2 -= 1
        if e2 >= (INDIVIDUOS / 2):
            e2 = 1
        e1 = np.random.random_integers(0, 1, 1)[0]
        e3 = int(FIT[e1][1])
        e3 -= 1
        if e3 >= (INDIVIDUOS / 2):
            e3 = 0

    e4 = np.random.random_integers(0, 1, 1)[0]
    e5 = int(FIT[e4][1])
    e5 -= 1
    if e5 <= (INDIVIDUOS / 2) - 1:
        e5 = j - e5

    return cruzamento(e2, e3, e3, gen, gen_string, gene_dec)


def cruzamento(i, j, pos, gen, gen_string, gene_dec):
    pc = np.random.random_integers(0, INDIVIDUOS, 1)[0]
    pc = (pc / 100)
    ale = (GENE - 12)
    gen_ale = np.random.random_integers(0, ale, 1)[0]
    gen_ale1 = np.random.random_integers(0, ale, 1)[0]
    if pc <= 0.6:
        gen[pos][gen_ale] = gen[i][gen_ale]
        gen[pos][gen_ale1] = gen[j][gen_ale1]
        gen[pos][gen_ale + 1] = gen[i][gen_ale + 1]
        gen[pos][gen_ale1 + 1] = gen[j][gen_ale1 + 1]
        # //
        gen[pos][gen_ale + 2] = gen[i][gen_ale + 2]
        gen[pos][gen_ale1 + 2] = gen[j][gen_ale1 + 2]
        # //
        gen[pos][gen_ale + 3] = gen[i][gen_ale + 3]
        gen[pos][gen_ale1 + 3] = gen[j][gen_ale1 + 3]
        # //
        gen[pos][gen_ale + 4] = gen[i][gen_ale + 4]
        gen[pos][gen_ale1 + 4] = gen[j][gen_ale1 + 4]
        # //
        gen[pos][gen_ale + 5] = gen[i][gen_ale + 5]
        gen[pos][gen_ale1 + 5] = gen[j][gen_ale1 + 5]
    return gen


def mutacao(gen):
    pm = np.random.random_integers(0, 10, 1)[0]
    pm = (pm / 100)

    e6 = np.random.random_integers(0, 1, 1)[0]
    e7 = int(FIT[e6][0])
    e7 -= 1
    if e7 <= (INDIVIDUOS / 2) - 1:
        e7 = (INDIVIDUOS - 1) - e6

    ale = (GENE - 1)
    gen_ale = np.random.random_integers(0, ale, 1)[0]

    if (gen[e7][gen_ale] is 0) and (pm <= 0.1):
        gen[e7][gen_ale] = 1
    else:
        gen[e7][gen_ale] = 0
    return gen


def imprime_fitness(fit, file, contador):
    global HIST_FIT, SOMA_NINT_TOTAL, SUP, N, soma_fit, soma_nint, contador_val, var_nint
    soma_fit = 0.0
    soma_nint = 0.0
    contador_val = 0
    var_nint = 0.0

    writer("\n\nResumo da Geracao:" + str(contador))
    writer("\n_______________________________________________________________")
    writer(
        "\nIND  |Fitness      |Posto  |Acum    |EMQ      |NINT  |NT" if N == 3 else "\nIND  |Fitness      |Posto  |Acum    |EMQ      |NINT1 |NINT2  |NT")
    writer("\n_______________________________________________________________")

    for i in range(0, INDIVIDUOS):

        writer("\n" + str(fit[i][0]))
        writer("    " + str(fit[i][1]))
        writer("     " + str(fit[i][2]))
        writer("     " + str(fit[i][3]))
        writer("      " + str(fit[i][4]))
        writer("   " + str(fit[i][5]))
        if N == 4:
            writer("      " + str(fit[i][7]))
        writer("   " + str(fit[i][6]))
        soma_fit = soma_fit + fit[i][1]
        if 0 < fit[i][5]:
            soma_nint = soma_nint + fit[i][5]
            contador_val += 1
        SUP = fit[i][3]

    writer("\n===============================================================\n")
    if 0 < contador_val:
        SOMA_NINT_TOTAL = SOMA_NINT_TOTAL + (soma_nint / contador_val)
        writer("\nMedia do Fitness=" + str(soma_fit / contador_val) + "\n")
        writer("Media de Neuronios na Camada Intermediaria na Geracao=" + str(soma_nint / contador_val) + "\n")

    HIST_FIT[contador - 1].append(("fitness", fit[0][1]))

    # HIST_FIT[contador - 1][0] = fit[0][1];

    if 0 < contador_val:
        # HIST_FIT[contador - 1][1] = soma_fit / contador_val;
        HIST_FIT[contador - 1].append(("fitness_medio", soma_fit / contador_val))
    else:
        # HIST_FIT[contador - 1][1] = 0.0;
        HIST_FIT[contador - 1].append(("fitness_medio", 0.0))

    for i in range(0, INDIVIDUOS):

        if 0 < fit[i][5]:
            var_nint = var_nint + pow((fit[i][5] - (soma_nint / contador_val)), 2) / contador_val

    writer("Variancia de Neuronios na Camada Intermediaria na Geracao=" + str(var_nint) + "\n")
    writer("Desvio Padrao de Neuronios na Camada Intermediaria na Geracao=" + str((var_nint) ** (1 / 2)) + "\n")

    if 0 < contador_val:
        writer("Erro Padrao de Neuronios na Camada Intermediaria na Geracao=" + str(
            ((var_nint) ** (1 / 2)) / ((contador_val) ** (1 / 2))) + "\n")
        writer("Coeficiente de Variacao de Neuronios na Camada Intermediaria na Geracao=" + str(
            ((var_nint) ** (1 / 2)) / (soma_nint / contador_val)) + "\n")

    if contador == GERACAO:
        writer(
            "\n\nMedia de Neuronios na Camada Intermediaria na Simulacao=" + str((SOMA_NINT_TOTAL / contador)) + "\n")


def imprime_cabec(file):
    writer("\nPercentagem de Regras Validas=" + str((CONTREGRASVAL / (INDIVIDUOS * GERACAO)) * 100.0) + "\n")
    writer("\n\nHistorico do Fitness na Simulacao")
    writer("\n________________________________________________________________")
    writer("\n Geracao  |Melhor Fitness         |Fitness Medio")
    writer("\n________________________________________________________________")

setConfigurarion(argv)
argsFormatted()

main()
