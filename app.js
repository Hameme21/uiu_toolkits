// Your provided short-term API key
const API_KEY = process.env.BEDROCK_API_KEY;

// The token's signature is scoped to eu-north-1
const region = "eu-north-1"; 
const modelId = "eu.anthropic.claude-opus-4-6-v1";
const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${modelId}/invoke`;

const invokeOpus = async () => {
    const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
            {
                role: "user",
                content: "Write a high-efficiency Node.js algorithm to parse an exam routine dataset and resolve scheduling conflicts between CSI 227 (Data Structure and Algorithm 2) and Fundamental Calculus."
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log("Claude 3 Opus says:\n\n", data.content[0].text);
        
    } catch (error) {
        console.error("API Error:", error.message);
    }
};

invokeOpus();