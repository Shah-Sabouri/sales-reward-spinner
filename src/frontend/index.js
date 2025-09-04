let currentUser = null;

// Logga in / register
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
        currentUser = data; // innehåller _id och spinsAvailable
        document.getElementById("result").innerText = `Logged in as ${currentUser.name}. Spins: ${currentUser.spinsAvailable || 0}`;
    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err.message;
    }
});

// Skapa order
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) {
        document.getElementById("result").innerText = "Log in first";
        return;
    }

    const items = [];
    if (document.getElementById("egg").checked) items.push("egg");
    if (document.getElementById("milk").checked) items.push("milk");
    if (document.getElementById("butter").checked) items.push("butter");

    try {
        const res = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: currentUser._id, // viktigt! matchar order.model
                items
            })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        // Uppdatera spins på currentUser
        currentUser.spinsAvailable = data.spinsAvailable;
        document.getElementById("result").innerText = `Order added! Spins now: ${currentUser.spinsAvailable}`;
    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err.message;
    }
});

// Snurra hjul
document.getElementById("spinButton").addEventListener("click", async () => {
    if (!currentUser) {
        document.getElementById("result").innerText = "Log in first";
        return;
    }

    try {
        const res = await fetch(`/api/spin/${currentUser._id}`, { method: "POST" });
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        currentUser.spinsAvailable = data.spinsAvailable;
        document.getElementById("result").innerText = `You won ${data.reward} points! Spins left: ${currentUser.spinsAvailable}`;
    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err.message;
    }
});

