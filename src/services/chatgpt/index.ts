import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
} from "openai";
import config from "@/config";

const apiKey = config.OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });

const model = "gpt-3.5-turbo";

export const getResponse = async (
  messages: ChatCompletionRequestMessage[]
): Promise<ChatCompletionResponseMessage | undefined> => {
  const openai = new OpenAIApi(configuration);

  const chatCompletion = await openai.createChatCompletion({
    model,
    messages,
  });

  return chatCompletion.data.choices[0].message;
};
