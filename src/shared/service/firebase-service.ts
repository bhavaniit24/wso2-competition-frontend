import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBiMkMqq4g6mwBV8eLfBfT7Y1LVc6oZ1Dw',
    authDomain: 'bhavan-ai.firebaseapp.com',
    projectId: 'bhavan-ai',
    storageBucket: 'bhavan-ai.appspot.com',
    messagingSenderId: '197033702204',
    appId: '1:197033702204:web:ab700230a6673a36776439',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const firebaseAuth = getAuth(firebaseApp);

export { firebaseApp, firebaseAuth };
