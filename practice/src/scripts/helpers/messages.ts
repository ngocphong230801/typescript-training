/**
 * customErrorMessages function generates and displays custom error messages as alerts.
 * @param {string} functionName - The name of the function where the error occurred.
 * @param {Error} error - The error object containing details about the error.
 * @returns {void}
 */
const customErrorMessages = (functionName: string, error: Error): void => {
    // Generate a custom error message including the function name and error details.
    const errorMessage = `Error while ${functionName}: ${error}`;
    
    // Show an alert with the error message.
    window.alert(errorMessage);
};

// Export the customErrorMessages function as the default export for the module.
export default customErrorMessages;
