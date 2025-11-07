import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string({
      invalid_type_error: "EMAIL : NO DEBE ESTAR VACIO"
    }).email(),
    password: z.string().min(3),
    habilitacion: z.string({
      invalid_type_error: "HABILITACION : NO DEBE ESTAR VACIO"
    }),
    nombre: z.string({
      invalid_type_error: "NOMBRE : NO DEBE ESTAR VACIO"
    }).refine(
      (val) => !/\d/.test(val),
      "NOMBRE : SOLO ADMITE LETRAS"
    ),
    medico: z.string({
      invalid_type_error: 'MEDICO: NO DEBE ESTAR VACIO'
    }),
    salvavida: z.string({
      invalid_type_error: "SALVAVIDA : NO DEBE ESTAR VACIO"
    }),
    id: z.number(),
  }),

  handler: async ({ nombre, email, password, habilitacion, medico, salvavida, id }) => {

    /* console.log({nombre, email, password, habilitacion, medico, salvavida, id})
     return true */

    try {
      const userId = await createUserWithEmailAndPassword(
        firebase.auth, email, password)
      const user = userId.user;

      await setDoc(doc(firebase.db, 'userscp', user.uid), {
        nombre: nombre,
        email: email,
        habilitacion: habilitacion,
        medico: medico,
        salvavida: salvavida,
        id: id,
        uid: user.uid
      });

    } catch (error) {

      const firebaseError = error as AuthError;
      if (firebaseError.code == 'auth/email-already-in-use') {
        throw new Error('EL CORREO YA EXISTE')
      }
    }
    return
  }

})







