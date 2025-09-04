let currentUser = null;

// LOGIN / REGISTER
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;

    try {
        const res = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });
        const data = await res.json();
        currentUser = data;
        updateUserInfo();
        await showSpinHistory();
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// ADD ORDER
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Log in first");

    const items = [];
    if (document.getElementById("egg").checked) items.push("egg");
    if (document.getElementById("milk").checked) items.push("milk");
    if (document.getElementById("butter").checked) items.push("butter");

    try {
        const res = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: "order_" + Date.now(),
                userId: currentUser._id,
                created_at: new Date().toISOString(),
                items
            })
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        currentUser.spinsAvailable = data.spinsAvailable;
        updateUserInfo();
        await showSpinHistory();
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// SPIN
document.getElementById("spinButton").addEventListener("click", async () => {
    if (!currentUser) return alert("Log in first");

    try {
        const res = await fetch(`/api/spin/${currentUser._id}`, { method: "POST" });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        currentUser.spinsAvailable = data.spinsAvailable;
        updateUserInfo();
        await showSpinHistory();
        alert(`You won ${data.reward} points!`);
    } catch (err) {
        alert("Error: " + err.message);
    }
});

// SHOW USER INFO
function updateUserInfo() {
    document.getElementById("userInfo").innerText =
        `Logged in as ${currentUser.name}. Spins: ${currentUser.spinsAvailable}`;
}

// SHOW SPIN HISTORY
async function showSpinHistory() {
    if (!currentUser) return;

    try {
        const res = await fetch(`/api/spin/history/${currentUser._id}`);
        const spins = await res.json();

        const list = document.getElementById("spinHistoryList");
        list.innerHTML = "";

        const seen = new Set();
        spins.forEach(spin => {
            if (!seen.has(spin._id)) {
                seen.add(spin._id);
                const li = document.createElement("li");
                li.innerText = `Reward: ${spin.reward}, Date: ${new Date(spin.createdAt).toLocaleString()}`;
                list.appendChild(li);
            }
        });
    } catch (err) {
        console.error(err);
    }
}
