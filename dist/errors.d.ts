/**
 * For context on the istanbul ignore statements below, see:
 * https://github.com/gotwarlost/istanbul/issues/690
 */
/**
 * Thrown when network requests to the Auth server fail.
 */
export declare class GenericError extends Error {
    error: string;
    error_description: string;
    constructor(error: string, error_description: string);
    static fromPayload({ error, error_description, }: {
        error: string;
        error_description: string;
    }): GenericError;
}
/**
 * Thrown when handling the redirect callback fails, will be one of Auth0's
 * Authentication API's Standard Error Responses: https://auth0.com/docs/api/authentication?javascript#standard-error-responses
 */
export declare class AuthenticationError extends GenericError {
    state: string;
    appState: any;
    constructor(error: string, error_description: string, state: string, appState?: any);
}
/**
 * Thrown when silent auth times out (usually due to a configuration issue) or
 * when network requests to the Auth server timeout.
 */
export declare class TimeoutError extends GenericError {
    constructor();
}
/**
 * Error thrown when the token exchange results in a `mfa_required` error
 */
export declare class MfaRequiredError extends GenericError {
    mfa_token: string;
    constructor(error: string, error_description: string, mfa_token: string);
}
