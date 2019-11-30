import fs from 'fs';
import fetch from 'node-fetch';
import { file } from 'tmp-promise';

import { ExtractInput } from '../gql/entities/ExtractEntity';

export const ExtractService = new class {
  async extract(input: ExtractInput) {

    const img = await (await input.image).createReadStream();
    const { path, cleanup } = await file();

    await new Promise(res => {
      fs.writeFile(path, img, () => {
        // Wait for FS to catchup
        setTimeout(res, 10);
      });
    });

    const fileStream = fs.createWriteStream(path);
    img.pipe(fileStream);


    const res = await fetch('http://localhost:5555/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: path
      })
    });

    cleanup();

    return await res.json();
  }
}();
