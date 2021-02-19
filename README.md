# Storage-Crypter  🌱
Storage-Crypter is a light and simple library made with [crypto-es](https://www.npmjs.com/package/crypto-es) that allow you to encrypt and decrypt the values present in your Local or Session Storage
## Install
You can install it through the npm packet manager typing `npm i storage-crypter`

## Usage 

It is very simple to use and you can use it with vanilla JavaScript or with Framework like Angular o library like React.

### Set Item ⚡
It Allows you to set the pair key value inside the store (the default value of the storage is session but you can change it to local)

`setItem(key,value, storage = 'session')`

### Get Item ⚡
Allow you to get the value associated at the given key  (the default value of the storage is session but you can change it to local) if empty it will return an empty string

`getItem(key,storage = 'session')`

### Remove  Item ⚡
Allow you to remove the pair key value associated at the given key from the storage  (the default value of the storage is session but you can change it to local)

`getItem(key,storage = 'session')`

# Examples 🔭

```javascript
import {StorageCrypter} from 'storage-crypter';
const storageCrypter = new StorageCrypter('Secret');
/** local storage */
const set = () => storageCrypter.setItem('example', 'value', 'local');
const remove = () => storageCrypter.removeItem('example', 'local');
const get = () => console.log(storageCrypter.getItem('example', 'local'));
/** session storage */
const set = () => storageCrypter.setItem('example', 'value',);
const remove = () => storageCrypter.removeItem('example');
const get = () => console.log(storageCrypter.getItem('example'));
```
