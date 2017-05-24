'use strict';

/**
 * Manipulate errors to be returned in http response
 * 
 * @param error
 * @returns Object
 */
export const errorHandler = (error) => {
    if ( ! error instanceof Error) { return error.message ? {error: error.message} : {error: error}; }

    if (error.errors) {
        let errorMessages = {};
        
        for (let key in error.errors) {
            errorMessages[key] = error.errors[key].message;            
        }

        return {error: errorMessages};
    }

    return {error: error.message};
};
