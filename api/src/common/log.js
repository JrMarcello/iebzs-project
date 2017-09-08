import chalk from 'chalk';
import moment from 'moment';

// Enable colors
chalk.enabled = true;

/**
 *  Formatted moment
 *
 * @returns {Date} - Returns the formatted date
 * */
const getFormattedData = () => (moment().format('DD-MM-YYYY HH:mm:ss'));


/**
 * Custom console log function
 *
 * @input-type {{
 *  info: (function(msg)),
 *  debug: (function(msg)),
 *  warn: (function(msg)),
 *  error: (function(msg))
 *  }}
 */
module.exports = {
  info: (msg) => {
    const formattedMsg = chalk.bold.white(`${getFormattedData()} [INFO] ${msg}\n`);
    process.stdout.write(formattedMsg);
  },
  debug: (msg) => {
    const formattedMsg = chalk.bold.blue(`${getFormattedData()} [DEBUG] ${msg}\n`);
    process.stdout.write(formattedMsg);
  },
  warn: (msg) => {
    const formattedMsg = chalk.bold.yellow(`${getFormattedData()} [WARN] ${msg}\n`);
    process.stdout.write(formattedMsg);
  },
  error: (msg) => {
    const errMsg = typeof msg === 'object' ? JSON.stringify(msg) : msg;
    const formattedMsg = chalk.bold.red(`${getFormattedData()} [ERROR] ${errMsg}\n`);
    process.stderr.write(formattedMsg);
  }
};
