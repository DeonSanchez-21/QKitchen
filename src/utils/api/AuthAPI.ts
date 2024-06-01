import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from "../../firebase";

export const LoginAPI = ( email: string, password: string) => {
    try{ 
        const response = signInWithEmailAndPassword(auth, email, password);
        return response

    }catch(err){
        return err
    }
}
export const RegisterAPI = ( email: string, password: string) => {
    try{ 
        const response = createUserWithEmailAndPassword(auth, email, password);
        return response

    }catch(err){
        return err
    }
}
export const GoogleSignInAPI = () => {
    try{ 
        let provider = new GoogleAuthProvider();
        let response = signInWithPopup(auth, provider)
        return response;

    } catch(err){
        return err
    }
}
export const FetchUserData = (uid: string) => {
    try{
       let response = auth.onAuthStateChanged(user => {
        console.log(user)
       })
       return response
    } catch(err){
        return err
    }
}