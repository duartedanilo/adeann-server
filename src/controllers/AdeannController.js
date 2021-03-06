const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const getmac = require("getmac");

class AdeannController {
  async status(req, res) {
    const { username } = req.params;

    try {
      const fileContent = await fs.readFileSync(
        path.resolve("users", username + ".log")
      );
      const userlist = fileContent.toString();
      return res.send({
        userlist: userlist.split("\r\n").filter((content) => !!content),
      });
    } catch (err) {
      return res.status(404).json({
        error: "File not exists",
      });
    }
  }

  async simulation(req, res) {
    const { username } = req.params;

    try {
      const userFileileContent = await fs.readFileSync(
        path.resolve("users", username + ".log")
      );
      const userlist = userFileileContent.toString();
      const lastSimulation = userlist
        .split("\r\n")
        .filter((content) => !!content)
        .pop();

      const populationPercentFileContent = await fs.readFileSync(
        path.resolve(
          "simulations",
          lastSimulation.replace("simulations/", ""),
          "population_percent.log"
        )
      );
      const populationPercent = populationPercentFileContent.toString();

      const generationPercentFileContent = await fs.readFileSync(
        path.resolve(
          "simulations",
          lastSimulation.replace("simulations/", ""),
          "generation_percent.log"
        )
      );
      const generationPercent = generationPercentFileContent.toString();

      const subjectPercentFileContent = await fs.readFileSync(
        path.resolve(
          "simulations",
          lastSimulation.replace("simulations/", ""),
          "subject_percent.log"
        )
      );
      const subjectPercent = subjectPercentFileContent.toString();

      return res.send({
        lastSimulation: lastSimulation,
        populationPercent: populationPercent,
        generationPercent,
        subjectPercent: subjectPercent,
      });
    } catch (err) {
      return res.status(404).json({
        error: "File not exists",
      });
    }
  }

  store(req, res) {
    // {
    // 	myName: '4654654',
    // 	nent: '12',
    // 	nsai: '1',
    // 	nint: '[1,2]',
    // 	nintX:
    // 	 '{"0_0":{"min":12,"max":23},"1_0":{"min":3,"max":32},"1_1":{"min":34,"max":35}}',
    // 	activationFunction: '{"0_0":"softmax","1_0":"linear","1_1":"softmax"}',
    // 	optimizer: '["rmsprop","sgd","adam"]',
    // 	batch: '32',
    // 	epochs: '1000',
    // 	generation: '10',
    // 	population: '10',
    // 	learningRate: '1' }

    const {
      simulation_name,
      username,
      generations,
      individuals,
      number_hidden_layers,
      hidden_layer_1_min,
      hidden_layer_1_max,
      hidden_layer_2_min,
      hidden_layer_2_max,
      activation_function_1,
      activation_function_2,
      learning_rate,
      optimizer,
      batch_size,
      epochs,
      interpreter,
    } = req.body;
    console.log(req.body);
    return res.json({ status: "Simulação iniciada" });
    let command = "";

    if (number_hidden_layers === 2)
      command = `${
        interpreter || "python"
      } adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${hidden_layer_2_min} ${hidden_layer_2_max} ${number_hidden_layers} ${activation_function_1} ${activation_function_2} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${
        interpreter || "python"
      }`;
    else
      command = `${
        interpreter || "python"
      } adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${number_hidden_layers} ${activation_function_1} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${
        interpreter || "python"
      }`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    return res.json({ status: "Simulação iniciada" });
  }

  storeWeb(req, res) {
    const extractData = (body) => {
      // {
      // 	myName: '4654654',
      // 	nent: '12',
      // 	nsai: '1',
      // 	nint: '[1,2]',
      // 	nintX:
      // 	 '{"0_0":{"min":12,"max":23},"1_0":{"min":3,"max":32},"1_1":{"min":34,"max":35}}',
      // 	activationFunction: '{"0_0":"softmax","1_0":"linear","1_1":"softmax"}',
      // 	optimizer: '["rmsprop","sgd","adam"]',
      // 	batch: '32',
      // 	epochs: '1000',
      // 	generation: '10',
      // 	population: '10',
      // 	learningRate: '1' }
      const nintX = JSON.parse(body.nintX);
      const activationFunction = JSON.parse(body.activationFunction);
      const number_hidden_layers = JSON.parse(body.nint);
      return {
        simulation_name: body.simulation || "default", //
        username: getmac.default(), //
        generations: body.generation,
        individuals: body.population,
        number_enter_layers: body.nent,
        number_hidden_layers: number_hidden_layers,
        number_out_layers: body.nsai,
        hidden_layer_0_min: nintX["0_0"] ? nintX["0_0"].min : null,
        hidden_layer_0_max: nintX["0_0"] ? nintX["0_0"].max : null,
        hidden_layer_1_min: nintX["1_0"] ? nintX["1_0"].min : null,
        hidden_layer_1_max: nintX["1_0"] ? nintX["1_0"].max : null,
        hidden_layer_2_min: nintX["1_1"] ? nintX["1_1"].min : null,
        hidden_layer_2_max: nintX["1_1"] ? nintX["1_1"].max : null,
        activation_function_0: activationFunction["0_0"],
        activation_function_1: activationFunction["1_0"],
        activation_function_2: activationFunction["1_1"],
        activation_function_N_0: activationFunction["N_0"],
        learning_rate: body.learningRate,
        optimizer: `${body.optimizer}`
          .replace(/\'/g, "\\'")
          .replace(/\"/g, '\\"'),
        batch_size: body.batch,
        epochs: body.epochs,
        interpreter: body.interpreter, //
      };
    };

    const {
      simulation_name,
      username,
      generations,
      individuals,
      number_enter_layers,
      number_hidden_layers,
      number_out_layers,
      hidden_layer_0_min,
      hidden_layer_0_max,
      hidden_layer_1_min,
      hidden_layer_1_max,
      hidden_layer_2_min,
      hidden_layer_2_max,
      activation_function_0,
      activation_function_1,
      activation_function_2,
      activation_function_N_0,
      learning_rate,
      optimizer,
      batch_size,
      epochs,
      interpreter,
    } = extractData(req.body);

    console.log(req.body);
    console.log("________");
    console.log(extractData(req.body));
    console.log("________");
    // return res.json({ status: "Simulação iniciada" });

    let command = "";

    if (number_hidden_layers.length == 1) {
      if (number_hidden_layers[0] === 2)
        command = `${
          interpreter || "python"
        } adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${number_enter_layers} ${hidden_layer_1_min} ${hidden_layer_1_max} ${hidden_layer_2_min} ${hidden_layer_2_max} ${
          2 /*number_hidden_layers*/
        } ${activation_function_1} ${activation_function_2} ${activation_function_N_0} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${
          interpreter || "python"
        }`;
      else
        command = `${
          interpreter || "python"
        } adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${number_enter_layers} ${hidden_layer_0_min} ${hidden_layer_0_max} ${
          1 /*number_hidden_layers*/
        } ${activation_function_0} ${activation_function_N_0} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${
          interpreter || "python"
        }`;
    } else {
      // TODO
    }
    console.log(command);
    return res.json({ status: "Simulação iniciada" });

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    return res.json({ status: "Simulação iniciada" });
  }
}

module.exports = new AdeannController();
