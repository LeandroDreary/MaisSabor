import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../Model/UserModel";
import dbConnect from "../utils/dbConnect";

interface IAuthenticateRequest {
    username: string;
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ username, email, password }: IAuthenticateRequest) {
        if ((!username && !email) || !password) throw new Error("authentication/email-password-incorrect");

        // Connecting to the database
        await dbConnect()

        let user = await User.findOne({
            email
        }).exec();

        if (!user) throw new Error("authentication/email-password-incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("authentication/email-password-incorrect");

        const token = sign(
            { email: user.email },
            process.env.JSONWEBTOKEN_DECODE,
            { subject: user.id, expiresIn: "30d" }
        );

        return token;
    }
}

export { AuthenticateUserService };