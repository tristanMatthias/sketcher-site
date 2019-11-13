import fs from 'fs';
import { file } from 'tmp-promise';
import extract from 'sketch-site-extractor';

import { ExtractInput } from '../gql/entities/ExtractEntity';

export const ExtractService = new class {
  async extract(input: ExtractInput) {
    const img = await (await input.image).createReadStream();
    const { path, cleanup } = await file();

    fs.writeFileSync(path, img);

    const fileStream = fs.createWriteStream(path);
    img.pipe(fileStream);

    const res = await extract(path);


    cleanup();

    return res;
  }
}();
