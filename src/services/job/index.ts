import { getResponse as getChatGptResponse } from '@/services/chatgpt'
import { JobWithoutId } from '@/types';
import { ChatCompletionRequestMessage } from 'openai';

export const generateAIJobDescription = async (jobInfo: JobWithoutId, language: string): Promise<string> => {

    const {
        title,
        location,
        duration,
        startDate,
        requirements,
        companyDetails,
        contactDetails,
        publishEndDate,
        duty
    } = jobInfo;

    const prompt = `
    You are AI work in staffing company, please provide AI generated job description for job has title is ${title} and Job Location ${location} Job Duration ${duration}
    Job Start Date ${startDate}
    Job Requirements ${requirements}
    Job Duty is ${duty}
    Company Details ${companyDetails}
    Contact Details ${contactDetails}
    Job Publish End Date ${publishEndDate}

    Please try to use sentences and paragraph as much as possible and I would like it in ${language}. Return in html format, include utf-8 to show in correct language
    `;

    const messages: ChatCompletionRequestMessage[] = [
        { role: 'system', content: prompt }
    ];

    const result = await getChatGptResponse(messages);

    return result?.content || '';
}