import { ChatCompletionRequestMessage } from "openai";
import prisma from "@/prisma";
import { getResponse as getChatGptResponse } from "@/services/chatgpt";
import { Job, JobWithoutId } from "@/types";

export const generateAIJobDescription = async (
  jobInfo: Job,
  language: string
): Promise<string> => {
  const {
    title,
    location,
    duration,
    startDate,
    requirements,
    companyDetails,
    contactDetails,
    publishEndDate,
    duty,
    id,
  } = jobInfo;

  const prompt = `
    You are AI work in staffing company, please provide AI generated job description for job has title is ${title} and Job Location ${location} Job Duration ${duration}
    Job Start Date ${startDate}
    Job Requirements ${requirements}
    Job Duty is ${duty}
    Company Details ${companyDetails}
    Contact Details ${contactDetails}
    Job Publish End Date ${publishEndDate}
    Remember to ask to add this id ${id} in the contact details as job id
    Please try to use sentences and paragraph as much as possible and I would like it in ${language}. Return in text with utf-8 format but do not include body and html tag
    `;

  const messages: ChatCompletionRequestMessage[] = [
    { role: "system", content: prompt },
  ];

  const result = await getChatGptResponse(messages);

  return result?.content || "";
};

export async function getAllJobs(): Promise<Job[]> {
  return prisma.job.findMany({
    orderBy: {
      title: 'asc'
    },
  });
}

export async function getJobById(id: string): Promise<Job | null> {
  return await prisma.job.findUnique({
    where: { id },
  });
}

export async function createJob(jobData: JobWithoutId): Promise<Job> {
  return await prisma.job.create({
    data: jobData,
  });
}

export async function updateJob(
  id: string,
  jobData: JobWithoutId
): Promise<Job> {
  return await prisma.job.update({
    where: { id },
    data: jobData,
  });
}

export async function deleteJob(id: string): Promise<boolean> {
  return await prisma.job.delete({
    where: { id },
  }) !== null;
}
