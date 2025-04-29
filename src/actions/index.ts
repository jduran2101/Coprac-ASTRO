import { loguinUser } from "./loguin.action";
import { registerUser } from "./resgister.action";
import { logout } from "./logout.action";

export const server = {
    registerUser : registerUser,
    loguinUser : loguinUser,
    logout : logout
}