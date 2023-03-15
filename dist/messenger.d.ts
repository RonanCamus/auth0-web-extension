import browser from 'webextension-polyfill';
import { GenericError } from './errors';
import { AuthenticationResult } from './global';
export declare type MaybePromise<T> = Promise<T> | T;
export declare type AuthStartMessage = {
    type: 'auth-start';
};
export declare type AuthParamsMessage = {
    type: 'auth-params';
};
export declare type AuthCleanUpMessage = {
    type: 'auth-cleanup';
};
export declare type AuthAckMessage = {
    type: 'auth-ack';
};
export declare type AuthResultMessage = {
    type: 'auth-result';
    payload: AuthenticationResult;
};
export declare type AuthErrorMessage = {
    type: 'auth-error';
    error: GenericError;
};
export declare type Message = AuthStartMessage | AuthParamsMessage | AuthCleanUpMessage | AuthAckMessage | AuthErrorMessage | AuthResultMessage;
export default class Messenger {
    sendTabMessage<M extends Message>(tabId: number, message: M): Promise<any>;
    sendRuntimeMessage<M extends Message>(message: M): Promise<any>;
    addMessageListener<M extends Message>(handler: (message: M, sender: browser.Runtime.MessageSender) => Promise<any>): void;
}
