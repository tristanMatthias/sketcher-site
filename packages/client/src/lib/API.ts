import axios from 'axios';
import { ParsedComponent } from '../types/entities';

const HOST = "%%API%%";

export default abstract class pAPI {

  private static readonly host = `${HOST}`;

  private static get headers() {
    return {}
  }

  static async extract(img: Blob) {
    const data = new FormData();
    data.append('file', img)
    let url = '/extract';
    return await this._send<ParsedComponent[]>(url, "post", data);
  }


  private static async _send<T>(
    url: string,
    method: 'get' | 'post' = 'get',
    data: any = null
  ) {
    try {
      const res = await axios({
        url: `${this.host}${url}`,
        method,
        data,
        headers: this.headers
      });
      return res.data as T;

    } catch (e) {
      throw e;
    }
  }
}
