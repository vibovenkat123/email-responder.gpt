import { Prompt } from "./prompt.js";

type Body = {
  model: string;
  messages: Message[];
  temperature: number;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
};

export type Response = {
  error?: Error;
  id: string;
  object: string;
  created: number;
  model: string;
  usage: Usage;
  choices: Choice[];
};
type Error = {
  message: string;
  type: string;
  code: string;
};
type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

type Choice = {
  finish_reason: string;
  index: 0;
  message: Message;
};

type Opts = {
  method: string;
  mode?: string;
  headers: {
    [key: string]: string;
  };
  body: string;
};
type Message = {
  role: string;
  content: string;
};
export default async function request(
  prompts: Prompt[],
  key: string
): Promise<any> {
  const body: Body = {
    model: "gpt-4",
    messages: prompts,
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };
  const opts: Opts = {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const url = "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, opts as RequestInit);
  const data: Response = await response.json();
  if (data.error) {
    console.error(data.error.message);
    throw new Error(`message: ${data.error.message}
                        type: ${data.error.type}
                        code: ${data.error.code}`);
  }
  return data;
}
