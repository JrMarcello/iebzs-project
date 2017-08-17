import * as Log from './log';

/**
 * Manipulate errors to be returned in http response
 *
 * @param {*} error - error
 * @returns {*} Object - Object error
 */
export const errorHandler = (error) => {
  logError(error);

  if (!(error instanceof Error)) {
    const has = Object.prototype.hasOwnProperty;
    if ((has.call(error, 'code') && has.call(error, 'message'))) {
      return { error: { code: error.code, message: error.message } };
    }

    return { error: error.message };
  }

  if (!error.errors) {
    return { error: error.message };
  }

  const errorMessages = {};
  Object.keys(error.errors).forEach((key) => {
    errorMessages[key] = error.errors[key].message;
  });

  return { error: errorMessages };
};

/**
 * Print the info message in console
 * @param {String} message - Info message
 * @returns {String} Message to be printed in console
 */
export const logInfo = (message) => {
  if (process.env.NODE_ENV === 'development') {
    Log.info(message);
  }
};

/**
 * Print the error message in console
 * @param {String} error - Error message
 * @returns {String} Message to be printed in console
 */
export const logError = (error) => {
  if (process.env.NODE_ENV === 'development') {
    Log.error(error);
  }
};

/**
 * Print the debug message in console
 * @param {String} message - Debug message
 * @returns {String} Message to be printed in console
 */
export const logDebug = (message) => {
  if (process.env.NODE_ENV === 'development') {
    Log.debug(message);
  }
};

/**
 * Print the warn message in console
 * @param {String} message - Warn message
 * @returns {String} Message to be printed in console
 */
export const logWarn = (message) => {
  if (process.env.NODE_ENV === 'development') {
    Log.warn(message);
  }
};

/**
 *  Validate email address function. If matchs, it returns true. If not, returns false
 *
 * @param {String} email - Email
 * @returns {Boolean} Email validation result
 */
export const validateEmail = (email) => {
  const EMAIL_REGEX = '^[a-zA-Z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  const regex = new RegExp(EMAIL_REGEX);

  return regex.test(email);
};
