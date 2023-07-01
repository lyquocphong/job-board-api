import { getResponse as getChatGptResponse } from '@/services/chatgpt'
import { ChatCompletionRequestMessage } from 'openai';

describe('Test chatGPT working', () => {
  it('should return "Hello, Phong!"', async () => {

    const reply = "Pong!";

    const messages: ChatCompletionRequestMessage[] = [
        { role: 'system', content: `I want you to reply ${reply}` }
    ];

    const response = await getChatGptResponse(messages)
    const content = response?.content || '';
    expect(content).toBe(reply);
  });
});