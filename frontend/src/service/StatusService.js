import axios from "axios";
import config from "../config/configuration.json";

export class StatusService {
  URL = {
    SERVER: config.server,
    SIMULATION: `simulation/${config.username}`,
  };
  getSimulationStatus = async () => {
    try {
      const {data} = await axios.get(
        `${this.URL.SERVER}/${this.URL.SIMULATION}`
      );
      return {data};
    } catch (e) {
        console.log(e)
    }
  };
}
