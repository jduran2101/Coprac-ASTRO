import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRout = ['/protected']

/*export const onRequest = defineMiddleware(async ({ url }, next) => {
    if (privateRout.includes(url.pathname)) {
        return new Response('Auth Necesaria', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic real= "Secure Area"',
            }
        })
    }
    return next();
})

export const onRequest = defineMiddleware((context, next)=> {
    if(context.url.pathname === "/protected"){
         return Response.redirect ( new URL("/registro", context.url))
    }
    return next()
});*/
export const onRequest = defineMiddleware ( async ({url, request, locals, redirect}, next)=> {
   const isLogged = !!firebase.auth.currentUser;

   locals.isLogged = isLogged
   if (!isLogged && privateRout.includes(url.pathname)){
      return redirect ('/registro')
   }
   return next();
})