import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../Model/UserModel";

interface IAuthenticateRequest {
    username: string;
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ username, email, password }: IAuthenticateRequest) {
        if ((!username && !email) || !password) throw new Error("Email/Password incorrect.");
        let user = await User.findOne({
            email
        }).exec();

        if (!user) throw new Error("Email/Password incorrect.");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("Email/Password incorrect.");

        const token = sign(
            { email: user.email },
            process.env.JSONWEBTOKEN_DECODE,
            { subject: user.id, expiresIn: "30d" }
        );

        return token;
    }
}

export { AuthenticateUserService };