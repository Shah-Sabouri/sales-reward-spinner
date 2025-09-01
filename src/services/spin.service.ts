import { User } from "../models/user.model";
import { Spin } from "../models/spin.model";

const rewards = [
    { value: 10, probability: 0.5 },   // 50%
    { value: 50, probability: 0.3 },   // 30%
    { value: 100, probability: 0.15 }, // 15%
    { value: 500, probability: 0.05 }, // 5%
];

function pickReward(): number {
    const rand = Math.random();
    let sum = 0;
    for (const r of rewards) {
        sum += r.probability;
        if (rand <= sum) return r.value;
    }
    return rewards[0].value; // FALLBACK
}

export const spinWheel = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    if (!user.spinsAvailable || user.spinsAvailable <= 0)
        throw new Error("No spins available");

    const reward = pickReward();

    const spin = await Spin.create({
        userId: user._id,
        reward,
        createdAt: new Date(),
    });

    user.spinsAvailable -= 1;
    user.spinHistory.push(spin._id);
    await user.save();

    return { reward, spinsAvailable: user.spinsAvailable };
};
