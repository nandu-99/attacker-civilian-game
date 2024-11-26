export async function getResponse(message) {
    console.log(message)
    const response = await fetch("http://localhost:3001/prompt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: message })
    });

    if (!response.ok) {
        throw new Error("Failed to fetch response");
    }

    const data = await response.json();
    return data;
}
