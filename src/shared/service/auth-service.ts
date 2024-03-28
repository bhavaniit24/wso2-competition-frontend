import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { firebaseAuth } from './firebase-service';

async function handleAuth(email: string, password: string, isSignUp: boolean) {
    let result = null,
        error = null;

    try {
        result = isSignUp
            ? await createUserWithEmailAndPassword(firebaseAuth, email, password)
            : await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

const logOut = async () => {
    await signOut(firebaseAuth);
};

const signUp = (email: string, password: string) => handleAuth(email, password, true);
const signIn = (email: string, password: string) => handleAuth(email, password, false);

export { signUp, signIn, logOut };
