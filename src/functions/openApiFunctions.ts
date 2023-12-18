import { GptExternalFunctions } from 'resources/functions';
import { OpenAPI } from 'resources/openAPISpec';
import { Axios } from 'axios';
import { jsonParse } from 'utils';

export class OpenApiFunctions extends GptExternalFunctions {
  public static async loadOpenApiUrl(docUrl: string): Promise<OpenAPI> {
    const axios = new Axios({});
    const { data } = await axios.get(docUrl);
    return jsonParse(data);
  }
}
