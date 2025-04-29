import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../firebase/config";

export const registerUser = defineAction({
    accept: "form",
    input: z.object({
        nombre: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    }),
    handler: async ({ nombre, email, password }) => {

        //creacion de usuario
        
             await createUserWithEmailAndPassword(
                firebase.auth, email, password
            )
            


       
       //return {ok:true , msg:'todo bien por aca'}
        
    }



})
