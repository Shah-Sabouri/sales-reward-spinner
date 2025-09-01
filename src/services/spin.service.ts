import { IUser, User } from "../models/user.model";
import { Spin } from "../models/spin.model";

const rewardOptions = [
    {value: 10, probability: 0.5 },
    {value: 50, probability: 0.3 },
    {value: 100, probability: 0.15 },
    {value: 500, probability: 0.05 },
];

const randomReward = () => {
    const rand = Math.random();
    let sum = 0;
    for (const r of rewardOptions) {
        sum += r.probability;
        if (rand <= sum) return r.value;
    }
    return rewardOptions[0]. value; // FALLBACK
};

export const assignSpinToUser = async (userId: string) => {
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new Error("User not found");
    
    user.spinsAvailable += 1;
    await user.save();
    return user;
};

export const performSpin = async (userId: string) => {
    const user: IUser | null = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (user.spinsAvailable <= 0) throw new Error ("No spins available");

    const reward = randomReward();
    const spin = await Spin.create({ userId, reward });
    user.spinsAvailable -= 1;
    user.spinHistory.push(spin._id);
    await user.save();

    return spin;
}