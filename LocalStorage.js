import {useState} from 'react';
export function readFromStorage(key){
    if(typeof window.localStorage !== 'undefined'){
        return JSON.parse(localStorage.getItem(key));
    }else{
        throw new Error("can not read the value");
    }
}
export function writeToStorage(key,value){
    if(typeof window.localStorage !== 'undefined'){
        let serialised = JSON.stringify(value);
        return localStorage.setItem(key, serialised);
    }else{
        throw new Error('can not write to local storage');
    }
}
export function useLocalStorageState(initialStateValue, storageKey) {
    let [state, setState] = useState(() => {
        const dataFromStore = readFromStorage(storageKey);
        return dataFromStore || initialStateValue;
    });

    function setPersistedState(value) {
        writeToStorage(storageKey, value);
        setState(value);
    }

    return [state, setPersistedState];
}