import fs from 'fs';
import { file } from 'tmp-promise';
import fetch from 'node-fetch';

import { ExtractInput } from '../gql/entities/ExtractEntity';

export const ExtractService = new class {
  async extract(input: ExtractInput) {

    const img = await (await input.image).createReadStream();
    const { path, cleanup } = await file();

    fs.writeFileSync(path, img);

    const fileStream = fs.createWriteStream(path);
    img.pipe(fileStream);


    const res = await fetch('http://localhost:8080/parse', {
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
