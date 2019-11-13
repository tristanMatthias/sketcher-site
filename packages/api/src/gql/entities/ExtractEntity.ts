import { Field, ObjectType, InputType } from 'type-graphql';

import { Readable } from 'stream';
import { GraphQLUpload } from '@tmatthias/boilerplate-api';

export class Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Readable;
}

@ObjectType()
export class EExtractBox {
  @Field()
  x: number;
  @Field()
  y: number;
  @Field()
  w: number;
  @Field()
  h: number;
}

@ObjectType()
export class EExtract {
  @Field(() => String)
  component: string;

  @Field(() => [Number, Number])
  center: [number, number];

  @Field(() => EExtractBox)
  box: EExtractBox;
}


@InputType()
export class ExtractInput {
  @Field(() => GraphQLUpload, { nullable: true })
  image: Upload;
}
