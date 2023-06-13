import { rwClient } from './config';
import type { TagAPITypes } from 'types-api/tag';

const TagAPI: TagAPITypes = {
  getAll: () => rwClient.get('/tags'),
};

export default TagAPI;
