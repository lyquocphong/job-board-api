import Joi from "joi";

require("dotenv").config();

export interface IConfig {
  APP_PORT: number;
  OPENAI_API_KEY: string;
}

const apiConfigSchema = Joi.object({
  APP_PORT: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
});

const rawConfig: any = {
  APP_PORT: process.env.APP_PORT,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

const { error } = apiConfigSchema.validate(rawConfig);

if (error) {
  throw new Error(`Invalid apiConfig: ${error.message}`);
}

const config: IConfig = {
  APP_PORT: Number.parseInt(rawConfig.APP_PORT as string),
  OPENAI_API_KEY: rawConfig.OPENAI_API_KEY as string,
};

export default config;
