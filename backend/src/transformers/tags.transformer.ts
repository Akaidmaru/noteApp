import { ValueTransformer } from 'typeorm';

export const tagsTransformer: ValueTransformer = {
  to: (value: string[]) => JSON.stringify(value),
  from: (value: string) => JSON.parse(value),
};
