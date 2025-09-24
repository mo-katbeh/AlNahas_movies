import {authClient} from "../../utils/auth-client"

authClient.signUp.email({
    email: input,
    password,
    name,
    image,
    callbackURL: "/"

})