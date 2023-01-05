import logger from "pino";
import dayjs from "dayjs"; // timestamp

const log = logger({
  //   prettyPrint: true, // no longer supported
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false, // process id
  },
  timestamp: () =>
    `,"time":"${dayjs().format("{YYYY} MM-DDTHH:mm:ss SSS [Z] A")}"`,
  //   timestamp: () => `"time":"${Date.now()}"`,
});
// "{YYYY} MM-DDTHH:mm:ss SSS [Z] A"
// format("x")
export default log;
