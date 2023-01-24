const morgan = require("morgan");
const json = require("morgan-json");
const logger = require("./logger");

const format = json({
  method: ":method",
  url: ":url",
  status: ":status",
  contentLength: ":res[content-length]",
  responseTime: ":response-time",
});

const httpLogger = morgan(format, {
  stream: {
    write: (message) => {
      const { method, url, status, contentLength, responseTime } =
        JSON.parse(message);

      logger.info("HTTP Access Log", {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        responseTime: Number(responseTime),
      });
    },
  },
});

module.exports = httpLogger;

// So here, we configured morgan with winston.
// so anytime we try to log a respponse using morgan, we use a logger info[line 24] (a winston functionality),
// so cos of this, we also get it in our log file.

// We combine the 2 here cos winston is not used to log http response
// Morgan is making the logs and sending it to winston that handles the transporting an dsaving it to the log
