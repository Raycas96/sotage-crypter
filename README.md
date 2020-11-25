# Storage Crypter

Storage Crypter is a js library for encrypt and decrypt local and session storage made with crypto-js.

## Installation

Use the package manager npm to install storage-crypter.

```bash
npm i storage-crypter
```

## Usage

```javascript
import {StorageCrypter} from 'storage-crypter';
/** Initialize the class with your secret key */
const secretKey = 'abc';
const store = new StorageCrypter(secretKey);

/** This will set the pair key value inside the Session storage */
store.setItem(key, value);


/** This will remove the pair key value from the Session storage with the given key */
store.removeItem(key);

/** This will get the pair value from the Session storage with the given key */
/** If the key isn't inside the Storage it'll turn an empty string */
store.getItem(key);

/** This will set the pair key value inside the Local storage */
store.setItem(key, value, 'local');

 /** This will set all the pair keys values inside the Session storage */
store.setItems(items);


/** This will remove the pair key value from the Session Local with the given key */
store.removeItem(key, 'local');

/** This will remove all the pair key value from the Session Local with the given keys */
/** items is an array of object like {key: string,value?: string,env?: 'session' | 'local'}*/
store.removeItems(items);

/** This will get the pair value from the Local storage with the given key */
store.getItem(key, 'local');

 /** Foreach triplet key - value - opt if the opt is set it will set the pair key - value inside the local o session storage  */
 /** else if the opt is remove it will remove the items from local or session storage */
/*
items is an object like
{
key: string,
value: string,
env: 'session' | local,
opt: 'set' | 'remove'
}
if the env property will left empty the 'session' value will be set
*/
 store.gestItems(items)


```
## Usage with rxjs
You can also use this package with rxjs and and listen on every Local and Session Storage change
```javascript
import {StorageCrypterObservable} from 'storage-crypter'
const secretKey = 'abc';
const storeObs = new StorageCrypterObservable(secretKey);
  
/** Everytime you consider setItems or removeitems you’ll emit an object,which is made like this {  opt: 'set' | 'remove',
                                                                                                      oldValue?: string,
                                                                                                      newValue?: string,
                                                                                                      key?: string } */
storeObs.storageSubject.subscribe(res => {
  console.log(res);
});

/** This will get the pair value from the Session storage with the given key */
/** If the key isn't inside the Storage it'll turn an empty string */
storeObs.getItem(key);

/** This will set the pair key value inside the Local storage */
storeObs.setItem(key, value, 'local');

/** This will remove the pair key value from the Session Local with the given key */
storeObs.removeItem(key, 'local');

/** Foreach triplet key - value - opt if the opt is set it will set the pair key - value inside the local o session storage  */
/** else if the opt is remove it will remove the items from local or session storage */
/*
items is an object like
{
key: string,
value: string,
env: 'session' | local,
opt: 'set' | 'remove'
}
if the env property will left empty the 'session' value will be set
after all the operation it will emit an array like 
{  
opt: 'set' | 'remove',
oldValue?: string,
newValue?: string,
key?: string 
}[]
*/
 store.gestItems(items)
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[ISC]
