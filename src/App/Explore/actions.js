import * as bucketlistActions from './../Common/actions/bucketlistActions';
import * as likeActions from './../Common/actions/likeActions';
import * as commentActions from './../Common/actions/commentActions';

export default {
  ...likeActions,
  ...commentActions,
  ...bucketlistActions,
};
