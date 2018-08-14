import * as types from '../constants';

const initialData = {
  bucketlists: [],
  nextUrl: '',
  previousUrl: '',
  newBucketlists: [],
  count: 0,
  bucketlist: {
    likes: [],
    comments: [],
    items: [],
  },
};

const initialState = {
  myData: initialData,
  allData: initialData,
  exploreData: initialData,
};

export default (state = initialState, action) => {
  let bucketList;

  switch (action.type) {
    case types.ADD_NEW_BUCKETLIST:
      if (action.dataType === 'allData') {
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            newBucketlists: [action.bucketlist, ...state[action.dataType].newBucketlists],
          },
        };
      }

      return state;

    case types.LOAD_BUCKETLISTS_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          ...action.data,
        },
      };

    case types.LOAD_OTHER_MORE_BUCKETLISTS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].newBucketlists,
            ...state[action.dataType].bucketlists,
          ],
          newBucketlists: [],
        },
      };

    case types.LOAD_MORE_BUCKETLISTS:
      if (action.dataType === 'allData') {
        return {
          ...state,
          [action.dataType]: {
            ...state[action.dataType],
            nextUrl: action.data.nextUrl,
            previousUrl: action.data.previousUrl,
            bucketlists: [
              ...new Set([...state[action.dataType].bucketlists, ...action.data.bucketlists]),
            ],
          },
        };
      }

      return state;

    case types.CREATE_BUCKETLIST_SUCCESS:
      bucketList = { ...action.bucketlist, items: [], comments: [] };

      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [bucketList, ...state[action.dataType].bucketlists],
        },
      };

    case types.GET_BUCKETLIST_SUCCESS:

      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlist: {
            ...state[action.dataType].bucketlist,
            ...action.bucketlist,
          },
        },
      };

    case types.UPDATE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map(bucketlist =>
              (bucketlist.id === action.bucketlist.id
                ? action.bucketlist
                : {
                  ...bucketlist,
                  likes: bucketlist.likes || [],
                  items: bucketlist.items || [],
                  comments: bucketlist.comments || [],
                })),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            action.bucketlist :
            state[action.dataType].bucketlist,
        },
      };

    case types.DELETE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists
              .filter(bucketlist => bucketlist.id !== action.bucketlist.id),
          ],
          newBucketlists: [
            ...state[action.dataType].newBucketlists
              .filter(bucketlist => bucketlist.id !== action.bucketlist.id),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {} :
            state[action.dataType].bucketlist,
        },
      };

    case types.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  items: [...bucketlist.items, action.item],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              items: [...state[action.dataType].bucketlist.items, action.item],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  items: [
                    ...bucketlist.items
                      .map(item => (item.id === action.item.id ? action.item : item)),
                  ],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              items: [
                ...state[action.dataType].bucketlist.items
                  .map(item => (item.id === action.item.id ? action.item : item)),
              ],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  items: [
                    ...bucketlist.items.filter(item => item.id !== action.item.id),
                  ],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              items: [
                ...state[action.dataType].bucketlist.items
                  .filter(item => item.id !== action.item.id),
              ],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.ADD_COMMENT:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  comments: [action.comment, ...bucketlist.comments],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              comments: [...state[action.dataType].bucketlist.comments, action.comment],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.EDIT_COMMENT:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  comments: [
                    ...bucketlist.comments
                      .map(comment => (
                        comment.id === action.comment.id ?
                          action.comment :
                          comment
                      )),
                  ],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              comments: [
                ...state[action.dataType].bucketlist.comments
                  .map(comment => (comment.id === action.comment.id ? action.comment : comment)),
              ],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.DELETE_COMMENT:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  comments: [
                    ...bucketlist.comments.filter(comment => comment.id !== action.comment.id),
                  ],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              comments: [
                ...state[action.dataType].bucketlist.comments
                  .filter(comment => comment.id !== action.comment.id),
              ],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.LIKE:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.like.bucketlistId) {
                return {
                  ...bucketlist,
                  likes: [action.like, ...(bucketlist.likes || [])],
                };
              }

              return bucketlist;
            }),
          ],
          bucketlist: state[action.dataType].bucketlist.id === action.bucketlist.id ?
            {
              ...state[action.dataType].bucketlist,
              likes: [...state[action.dataType].bucketlist.likes, action.like],
            } :
            state[action.dataType].bucketlist,
        },
      };

    case types.UNLIKE:
      return {
        ...state,
        [action.dataType]: {
          ...state[action.dataType],
          bucketlists: [
            ...state[action.dataType].bucketlists.map(bucketlist => ({
              ...bucketlist,
              likes: [
                ...bucketlist.likes.filter(like => like.id !== action.like.id),
              ],
            })),
          ],
          bucketlist: {
            ...state[action.dataType].bucketlist,
            likes: [
              ...state[action.dataType].bucketlist.likes
                .filter(like => like.id !== action.like.id),
            ],
          },
        },
      };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
