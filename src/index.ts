import * as crypto from 'crypto-js';

export class StorageService {
    //
    /// private
    //
    constructor(secretWord: string) {
        this._secretWord = secretWord;
    }

    private _secretWord: string = '';

    public setItem(key: string, value: string, env: 'local' | 'session' = 'session'): Promise<void> {
        return new Promise((res, rej) => {
            env === 'session' ? sessionStorage.setItem(crypto.MD5(key).toString(), crypto.Rabbit.encrypt(value, this._secretWord, undefined).toString()) : localStorage.setItem(crypto.MD5(key).toString(), crypto.Rabbit.encrypt(value, this._secretWord, undefined).toString());
            res();
        });
    }

    public getItem(key: string, env: 'local' | 'session' = 'session'): string {
        const keyEnc = crypto.MD5(key).toString();
        const keyValue = env === 'local' ? localStorage.getItem(keyEnc) : sessionStorage.getItem(keyEnc);
        if (keyValue) {
            return crypto.Rabbit.decrypt(keyValue, this._secretWord, undefined).toString(crypto.enc.Utf8);
        } else {
            return '';
        }
    }


    public removeItem(key: string, env: 'local' | 'session' = 'session'): void {
        const keyEnc = crypto.MD5(key).toString();
        env === 'local' ? localStorage.removeItem(keyEnc) : sessionStorage.removeItem(keyEnc);
    }
}
