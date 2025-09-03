import { User } from "../models/user.model";

interface CreateOrLoginInput {
    name: string;
}

export const createOrLoginUser = async (data: CreateOrLoginInput) => {

    let user = await User.findOne({
        name:data.name
    });

    if (!user) {
            const user = new User({
        name: data.name,
        spinsAvailable: 0,
        spinHistory: []
    });
    await user.save();
    console.log("new user creeated:")
    } else {
        console.log("user logged in");
    }
return user;  
};
