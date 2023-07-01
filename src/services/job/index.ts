import { getResponse as getChatGptResponse } from '@/services/chatgpt'
import { ChatCompletionRequestMessage } from 'openai';

export const generateJobDescription = async () => {
    const jobTitle = 'Software Engineer';
    const jobLocation = 'San Francisco';
    const jobDuration = 'Full-time';
    const jobStartDate = 'September 1, 2023';
    const jobRequirements = '3+ years of experience in software development';
    const companyDetails = 'XYZ Tech Inc. is a leading technology company specializing in software solutions.';
    const contactDetails = 'For more information, please contact us at jobs@xyztech.com';
    const jobPublishEndDate = 'July 15, 2023';

    const prompt = `
    You are AI work in staffing company, please provide AI generated job description for job has title is ${jobTitle} and Job Location ${jobLocation} Job Duration ${jobDuration}
    Job Start Date ${jobStartDate}
    Job Requirements ${jobRequirements}

    Company Details ${companyDetails}
    Contact Details ${contactDetails}
    Job Publish End Date ${jobPublishEndDate}

    Please try to avoid listing style as much as possible and I would like it in Finnish. Return in html format, include utf-8 to show in correct language. The lenght should be same with one A4
    `;

    const messages: ChatCompletionRequestMessage[] = [
        { role: 'system', content: prompt }
    ];

    const result = await getChatGptResponse(messages);

    return result?.content || '';
}