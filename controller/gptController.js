const { OpenAI } = require('openai');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// Generate household task using OpenAI GPT
const generateHouseholdTask = async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that replies with only one household task, nothing else.',
                },
                {
                    role: 'user',
                    content: `Give me one household task.`,
                },
            ],
            temperature: 0.7,
        });

        const suggestion = completion.choices[0].message.content.trim();
        res.send(suggestion);
    } catch (error) {
        res.status(404).send("Could not generate/make API Call");
    }
};

module.exports = {
    generateHouseholdTask
}; 