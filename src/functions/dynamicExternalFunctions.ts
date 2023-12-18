import { GptExternalFunctions } from 'resources/functions';
import { OpenAPI } from 'resources/openAPISpec';
import { Axios } from 'axios';
import { jsonParse } from 'utils';
import { Prompt, PromptRepository } from 'repositories/prompt';
import { CacheRepository } from 'repositories/cache';

interface Capsula {
  date: Date;
  instance: GptExternalFunctions;
}

export class DynamicExternalFunctions {
  axios: Axios;

  constructor() {
    this.axios = new Axios({});
  }

  public async getInstance(
    accountId: number,
    promptAlias: string
  ): Promise<GptExternalFunctions> {
    const prompt = await PromptRepository.getPromptByAlias(
      accountId,
      promptAlias
    );

    if (!prompt) {
      throw new Error(`Prompt not found: ${promptAlias}`);
    }

    const openapi = CacheRepository.get(promptAlias);

    if (openapi) {
      const capsula: Capsula | undefined = CacheRepository.get(promptAlias);

      if (capsula !== undefined && capsula.date !== prompt.updatedAt) {
        CacheRepository.forceRemove(promptAlias);
        return this.makeInstance(promptAlias, prompt);
      } else {
        return openapi;
      }
    }

    return this.makeInstance(promptAlias, prompt);
  }

  async makeInstance(
    promptAlias: string,
    prompt: Prompt
  ): Promise<GptExternalFunctions> {
    try {
      const axios = new Axios({});
      const { data } = await axios.get(prompt.functionsUrl);
      const openapi = jsonParse<OpenAPI>(data);

      CacheRepository.set(promptAlias, {
        date: prompt.updatedAt,
        instance: new GptExternalFunctions(openapi, this.axios)
      });

      const capsula: Capsula = CacheRepository.get(promptAlias);

      if (capsula) {
        return capsula.instance;
      } else {
        throw new Error('Error on get external functions');
      }
    } catch (error) {
      throw new Error(
        `Error on get external functions "${promptAlias}", url "${prompt.functionsUrl}": ${error}`
      );
    }
  }
}
