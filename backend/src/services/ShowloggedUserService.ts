import { classToPlain } from "class-transformer";
import { User } from "../Model/UserModel";

class ShowloggedUserService {
    async execute(user_id){
        const users = await User.findOne(user_id).exec();

        return classToPlain(users);
    }
}

export { ShowloggedUserService };