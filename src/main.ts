import inquirer from 'inquirer'
import generatePrompt from './prompt.js';
import request from './request.js';
import { Response } from './request.js';

type settingAnswers = {
    num_responses: number;
}

type emailAnswers = {
    content: string,
}

async function getSettings(): Promise<settingAnswers> {
    const answers: settingAnswers = await inquirer.prompt(
        {
            name: "num_responses",
            type: "number",
            message: "How many responses should we generate",
            default() {
                return 1;
            }
        },
    )
    return answers;
}

async function getEmail(): Promise<emailAnswers> {
    const answers: emailAnswers = await inquirer.prompt(
        {
            name: "content",
            type: "editor",
            message: "Enter the email you want to reply to",
            default() {
                return "Can you meet at 7:00?"
            }
        }
    )
    return answers;
}

async function main() {
    const settings = await getSettings();
    const email = await getEmail()
    const prompts = generatePrompt(settings.num_responses, email.content)
    const data: Response = await request(prompts);
    for (const choice of data.choices) {
        console.log(choice.message.content);
    }
}

main();
