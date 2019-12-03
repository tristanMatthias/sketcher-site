import { Arg, Query, Resolver } from 'type-graphql';

import { ExtractService } from '../../services/Extract.service';
import { EExtract, ExtractInput } from '../entities/ExtractEntity';


@Resolver(EExtract)
export class ExtractResolver {

  @Query(() => [EExtract], { nullable: true })
  async extract(
    @Arg('extract') extract: ExtractInput
  ) {
    return ExtractService.extract(extract);
  }
}
