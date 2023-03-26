export default async function request(prompts, key) {
    const body = {
        model: "gpt-4",
        messages: prompts,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };
    const opts = {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };
    const url = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(url, opts);
    const data = await response.json();
    if (data.error) {
        console.error(data.error.message);
        throw new Error(`message: ${data.error.message}
                        type: ${data.error.type}
                        code: ${data.error.code}`);
    }
    return data;
}
