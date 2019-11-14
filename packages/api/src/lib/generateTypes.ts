import API from '@tmatthias/boilerplate-api';
import path from 'path';


(async () => {
  await API.lib.generateSchemaFile.generateSchema(path.resolve(__dirname, '../gql/resolvers'));
  await API.lib.generateSchemaFile.generateTypes();
})();
