import inquirer from 'inquirer'
type settingAnswers = {
    num_responses: number;
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
async function main() {
    const settings = await getSettings();
    console.log(settings.num_responses)
}

main();
