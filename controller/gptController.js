const { OpenAI } = require('openai');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

// Generate household task using OpenAI GPT
const generateHouseholdTask = async (req, res) => {
    try {
        const { pastTasks, workerName } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: [
                {
                    role: 'system',
                    content: 'You are a task management assistant that generates household tasks based on patterns in previous tasks. Generate ONLY ONE specific task without any explanation, introduction or additional text.',
                },
                {
                    role: 'user',
                    content: `Here are some previous tasks assigned to a worker: ${pastTasks}. 
                    
Please suggest ONE new household task that is thematically similar to these past tasks. The task should be in the same category as the previous tasks, but different enough to not be a duplicate.`,
                },
            ],
            temperature: 0.7,
            max_tokens: 50,
        });

        const suggestion = completion.choices[0].message.content.trim();
        res.send(suggestion);
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(404).send("Could not generate/make API Call");
    }
};

module.exports = {
    generateHouseholdTask
}; 