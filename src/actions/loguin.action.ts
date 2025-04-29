import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../firebase/config";

export const loguinUser = defineAction ({
    accept: "form",
    input : z.object({
        email: z.string().email(),
        password: z.string(),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({email, password, remember_me}) => {



        try {
            const user = await signInWithEmailAndPassword(
                firebase.auth,
                email,
                password   
            )
        }
        catch (error){
            const firebaseError = error;
            if (firebaseError.code === 'Auth/email-already-in-use'){
                throw new Error('El correo ya existe')
            }
            console.log(error)
            throw new Error('No se pudo ingresar al usuario')
        }
    }
})