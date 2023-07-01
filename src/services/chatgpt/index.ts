import { ChatCompletionResponseMessage, Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai"

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY || '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',
});

const model = "gpt-3.5-turbo";

export const getResponse = async (messages: ChatCompletionRequestMessage[]): Promise<ChatCompletionResponseMessage | undefined> => {
    const openai = new OpenAIApi(configuration);    

    const chatCompletion = await openai.createChatCompletion({
        model,
        messages,
    });

    return chatCompletion.data.choices[0].message;
}