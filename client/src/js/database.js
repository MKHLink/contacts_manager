import {openDB} from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () =>{
    openDB('contact_db',1,{

        upgrade(db){
            if(db.objectStoreNames.contains('contacts')){
                console.log('contacts store already exists');
                return;
            }
            db.createObjectStore('contacts', {keyPath:'id', autoIncrement: true});
            console.log('contacts store created');
        }
    });
}

export const getDb = async () => {
    console.log('GET from the database');

    // Create a connection to the IndexedDB database and the version we want to use.
    const contactDB = await openDB('contact_db',1);

    // Create a new transaction and specify the store and data privileges.
    const tx = contactDB.transaction('contacts','readonly');

    // Open up the desired object store.
    const store = tx.objectStore('contacts');

    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    console.log('result.value',result);
    return result;
};

export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the database');
  
    // Create a connection to the database and specify the version we want to use.
    const contactDb = await openDB('contact_db', 1);
  
    // Create a new transaction and specify the store and data privileges.
    const tx = contactDb.transaction('contacts', 'readwrite');
  
    // Open up the desired object store.
    const store = tx.objectStore('contacts');
  
    // Use the .add() method on the store and pass in the content.
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });
  
    // Get confirmation of the request.
    const result = await request;
    console.log('🚀 - data saved to the database', result);
  }