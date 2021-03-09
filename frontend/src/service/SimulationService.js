import axios from "axios";
import config from "../config/configuration.json";

export class StatusService {
  URL = {
    SERVER: config.server,
    ADEANN: `adeann`,
  };
  getSimulationStatus = async () => {
    try {
      const { data } = await axios.post(`${this.URL.SERVER}/${this.URL.ADEANN}`);
      return { data };
    } catch (e) {
      console.log(e);
    }
  };
}
