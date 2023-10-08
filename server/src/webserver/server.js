import { configKeys } from "../config.js";

const serverConfig = (server) => {
  server.listen(configKeys.PORT, () => {
    console.log(`Listening to port ${configKeys.PORT}`);
  });
};
export default serverConfig;
