const ErrorUtils = require('ErrorUtils');

import {
  NativeModules,
} from 'react-native';

import parseErrorStack from 'parseErrorStack';
import sourceMap from 'source-map';

const base64 = require('base-64');
const utf8   = require('utf8');

const ErrorManager = NativeModules.ErrorManager;

// set to noop
global.notifyError = () => {};

if (ErrorManager && ErrorUtils._globalHandler) {
  let exceptionID = 0;

  const getSourceMapInstance = () => {
    return new Promise((resolve, reject) => {
      try {
        ErrorManager.getSourceMaps((data) => {
          try {
            const content = utf8.decode(base64.decode(data));
            resolve(new sourceMap.SourceMapConsumer(JSON.parse(content)));
          } catch (e) {
            reject(e);
          }
        });
      } catch (e) {
        console.warn('Error parsing the error from the sourcemap', e.message);
        reject(e);
      }
    });
  };

  const parseErrorStackPromise = (error) => {
    return new Promise((resolve) => {
      global.setTimeout(() => {
        resolve(parseErrorStack(error));
      }, 8000);

      getSourceMapInstance().then((sourceMapInstance) => {
        resolve(parseErrorStack(error, [sourceMapInstance]));
      }).catch((e) => {
        console.warn(e);
        resolve(parseErrorStack(error));
      });
    });
  };

  const previousGlobalHandler = ErrorUtils._globalHandler;
  const wrapGlobalHandler = async (error, isFatal) => {
    let currentExceptionID = ++exceptionID;
    const stack = await parseErrorStackPromise(error);

    const timeoutPromise = new Promise((resolve) => {
      global.setTimeout(() => {
        resolve();
      }, 10000);
    });

    const reportExceptionPromise = new Promise((resolve) => {
      ErrorManager.reportException(error.message, stack, currentExceptionID, {}, resolve);
    });

    return Promise.race([reportExceptionPromise, timeoutPromise]).then(() => {
      previousGlobalHandler(error, isFatal);
    });
  };
  ErrorUtils.setGlobalHandler(wrapGlobalHandler);

  global.notifyError = async (error, errorData) => {
    if (error instanceof Error) {
      console.log('notifyError', error, errorData);
      let currentExceptionID = ++exceptionID;
      const stack = await parseErrorStack(error);

      const errDataObject = errorData || {};

      ErrorManager.reportException(
        error.message,
        stack,
        currentExceptionID,
        // Make all values string
        errDataObject.map((val, key) => (val || 'NULL').toString()),
        () => {}
      );
    } else {
      console.warn('attempt to call notifyError without an Error', error, errorData);
    }
  }
}
