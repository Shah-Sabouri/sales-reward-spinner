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
        document.getElementById("result").innerText = JSON.stringify(data, null, 2);
    }  catch (err) {
        document.getElementById("result").innerText ="error:" + err.message;
    }
 });

