import * as crypto from 'crypto-es';
import { Env } from './types';

export const storageCrypter = (secret: string) => {
    /** This will set the pair key value inside the Session storage */
    const setItem = (key: string, value: string, env: Env = 'session'): void => {
        if (env === 'session') {
            sessionStorage.setItem(
                crypto.default.MD5(key).toString(),
                crypto.default.Rabbit.encrypt(value, secret, undefined).toString()
            );
            return;
        }
        localStorage.setItem(
            crypto.default.MD5(key).toString(),
            crypto.default.Rabbit.encrypt(value, secret, undefined).toString()
        );
    };

    /** This will get the pair value from the Session storage with the given key */
    /** If the key isn't inside the Storage it'll turn an empty string */
    const getItem = (key: string, env: Env = 'session'): string => {
        const keyEnc = crypto.default.MD5(key).toString();
        const keyValue =
            env === 'local' ? localStorage.getItem(keyEnc) : sessionStorage.getItem(keyEnc);
        if (keyValue) {
            return crypto.default.Rabbit.decrypt(keyValue, secret, undefined).toString(
                crypto.default.enc.Utf8
            );
        }
        return '';
    };

    /** This will remove the pair key value from the Session Local with the given key */
    const removeItem = (key: string, env: Env = 'session'): void => {
        const keyEnc = crypto.default.MD5(key).toString();
        if (env === 'local') {
            localStorage.removeItem(keyEnc);
            return;
        }
        sessionStorage.removeItem(keyEnc);
    };

    /** This will switch selected item from local to session storage */
    const switchFromLocal = (key: string): boolean => {
        const value = getItem(key, 'local');
        if (value) {
            setItem(key, value);
            removeItem(key, 'local');
            return true;
        }
        return false;
    };

    /** This will switch selected item from session to local storage */
    const switchFromSession = (key: string): boolean => {
        const value = getItem(key);
        if (value) {
            setItem(key, value, 'local');
            removeItem(key);
            return true;
        }
        return false;
    };

    const clearStorage = (env: 'session' | 'local' = 'session'): void => {
        if (env === 'session') {
            const keys = Object.keys(sessionStorage);
            console.log('keys', keys)
            keys.forEach((key) => sessionStorage.removeItem(key));
            return;
        }

        const keys = Object.keys(localStorage);
        console.log('keys', keys)
        keys.forEach((key) => localStorage.removeItem(key));
    };

    return { clearStorage, removeItem, getItem, setItem, switchFromSession, switchFromLocal };
};
