const handleError = (functionName: string, error: Error): void => {
    const errorMessage = `Error while ${functionName}: ${error}`;
    console.error(errorMessage);
};

export default handleError;
