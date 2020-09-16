const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

class AdeannController {
	status(req, res) {
        const { username } = req.params;
        
        try {
            const fileContent = fs.readFileSync(path.resolve('users', username + '.log'));

            // const 

            return res.send(fileContent)
        }catch(err) {
            return res.status(404).json({
                error: 'File not exists'
            });
        }
	}

	store(req, res) {
		return res.json({ status: "Simulação iniciada" });
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
		} = req.body;

		let command = "";

		if (number_hidden_layers === 2)
			command = `python3.6 adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${hidden_layer_2_min} ${hidden_layer_2_max} ${number_hidden_layers} ${activation_function_1} ${activation_function_2} ${learning_rate} ${optimizer} ${batch_size} ${epochs} python3.6`;
		else
			command = `python3.6 adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${number_hidden_layers} ${activation_function_1} ${learning_rate} ${optimizer} ${batch_size} ${epochs} python3.6`;

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
