import inquirer from 'inquirer'
type settingAnswers = {
    num_responses: number;
}

type emailAnswers = {
    content: string,
}

async function getSettings(): Promise<settingAnswers> {
    const settingsAnswers = await inquirer.prompt(
        {
            name: "num_responses",
            type: "number",
            message: "How many responses should we generate",
            default() {
                return 1;
            }
        },
    )
    return settingsAnswers;
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
    console.log(settings.num_responses)
}

main();
