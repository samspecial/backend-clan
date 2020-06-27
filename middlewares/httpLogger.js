const morgan = require('morgan');
const logger = require('./logger');

logger.stream = {
  write: (message) => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

module.exports = morgan(
  ':method\t\t:url\t\t:status\t\t:response-time[0]ms',
  { stream: logger.stream }
);
