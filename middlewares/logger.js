const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf((info) => `${info.message.split('\t\t')[3].indexOf('ms') === 1 ? `${info.message.split('\t\t')[0]}\t\t${info.message.split('\t\t')[1]}\t\t${info.message.split('\t\t')[2]}\t\t0${info.message.split('\t\t')[3]}` : info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});

module.exports = logger;
