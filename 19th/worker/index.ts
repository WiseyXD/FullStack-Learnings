import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
    const { problemId, code, language } = JSON.parse(submission);

    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);
    // Here you would add your actual processing logic

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${problemId}.`);
    client.publish("problems_done", JSON.stringify({ problemId, status: "TLE" }));
}

const main = async () => {
    try {
        await client.connect();
        client.on("error", (err) => console.log("Redis Client Error", err));

        while (true) {
            try {
                const submission = await client.brPop("problems", 0);
                await processSubmission(submission?.element!);
            } catch (error) {
                console.log(error);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

main();
