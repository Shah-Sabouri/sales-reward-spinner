import { User } from "../models/user.model";

interface CreateUserInput {
    name: string;
}

export const createUser = async (data: CreateUserInput) => {
    const user = new User({
        name: data.name,
        spinsAvailable: 0,
        spinHistory: []
    });

    await user.save();
    return user;
};