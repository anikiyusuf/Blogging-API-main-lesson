const winston = require("winston");

// What we're doing here is configuring how winston logs the file and where it saves it to.
// We can either save our log files on the server file or in an external storage as we specify it here.
// Different file levels in NodeJS:
// Level 0(error), Level 1(warning), Level 2(info), Level 3(vaburse), Level 4(debug), Level 5( silly :) )

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels, //we set the default levels we listed above
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

module.exports = logger;
