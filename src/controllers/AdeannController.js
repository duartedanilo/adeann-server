const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

class AdeannController {
	async status(req, res) {
        const { username } = req.params;
        
        try {
            const fileContent = await fs.readFileSync(path.resolve('users', username + '.log'));
			const userlist = fileContent.toString()
            return res.send({userlist: userlist.split("\r\n").filter(content=>!!content)})
        }catch(err) {
            return res.status(404).json({
                error: 'File not exists'
            });
        }
	}

	async simulation(req, res) {
        const { username } = req.params;
        
        try {
            const userFileileContent = await fs.readFileSync(path.resolve('users', username + '.log'));
			const userlist = userFileileContent.toString()
			const lastSimulation = userlist.split("\r\n").filter(content=>!!content).pop()

			const populationPercentFileContent = await fs.readFileSync(path.resolve('simulations', lastSimulation.replace("simulations/", ""), 'population_percent.log'));
			const populationPercent = populationPercentFileContent.toString()
			
			const generationPercentFileContent = await fs.readFileSync(path.resolve('simulations', lastSimulation.replace("simulations/", ""), 'generation_percent.log'));
			const generationPercent = generationPercentFileContent.toString()
			
			const subjectPercentFileContent = await fs.readFileSync(path.resolve('simulations', lastSimulation.replace("simulations/", ""), 'subject_percent.log'));
			const subjectPercent = subjectPercentFileContent.toString()

            return res.send({lastSimulation: lastSimulation, populationPercent: populationPercent, generationPercent, subjectPercent: subjectPercent })
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
			interpreter
		} = req.body;

		let command = "";

		if (number_hidden_layers === 2)
			command = `${interpreter || 'python'} adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${hidden_layer_2_min} ${hidden_layer_2_max} ${number_hidden_layers} ${activation_function_1} ${activation_function_2} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${interpreter || 'python'}`;
		else
			command = `${interpreter || 'python'} adeann.py ${simulation_name} ${username} ${generations} ${individuals} ${hidden_layer_1_min} ${hidden_layer_1_max} ${number_hidden_layers} ${activation_function_1} ${learning_rate} ${optimizer} ${batch_size} ${epochs} ${interpreter || 'python'}`;

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
