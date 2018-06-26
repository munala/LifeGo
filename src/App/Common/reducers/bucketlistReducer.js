import * as types from '../constants';

const initialData = {
  bucketlists: [],
  nextUrl: '',
  previousUrl: '',
  newBucketlists: [],
  count: 0,
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
      return {
        ...state,
        [action.dataType]: {
          newBucketlists: [action.bucketlist, ...state[action.dataType].newBucketlists],
          count: state.count + 1,
        },
      };

    case types.LOAD_BUCKETLISTS_SUCCESS:
      return {
        ...state,
        [action.dataType]: { ...action.data },
      };

    case types.LOAD_MORE_BUCKETLISTS:
      return {
        ...state,
        [action.dataType]: {
          nextUrl: action.data.nextUrl,
          previousUrl: action.data.previousUrl,
          bucketlists: [
            ...new Set([...state[action.dataType].bucketlists, ...action.data.bucketlists]),
          ],
        },
      };

    case types.CREATE_BUCKETLIST_SUCCESS:
      bucketList = { ...action.bucketlist, items: [], comments: [] };
      return {
        ...state,
        [action.dataType]: { bucketlists: [bucketList, ...state[action.dataType].bucketlists] },
      };

    case types.UPDATE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          bucketlists: [
            ...state[action.dataType].bucketlists.map(bucketlist =>
              (bucketlist.id === action.bucketlist.id
                ? action.bucketlist
                : {
                  ...bucketlist,
                  items: bucketlist.items || [],
                  comments: bucketlist.comments || [],
                })),
          ],
        },
      };

    case types.DELETE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
          bucketlists: [
            ...state[action.dataType].bucketlists
              .filter(bucketlist => bucketlist.id !== action.bucketlist.id),
          ],
        },
      };

    case types.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.ADD_COMMENT:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.EDIT_COMMENT:
      return {
        ...state,
        [action.dataType]: {
          bucketlists: [
            ...state[action.dataType].bucketlists.map((bucketlist) => {
              if (bucketlist.id === action.bucketlist.id) {
                return {
                  ...bucketlist,
                  comments: [
                    ...bucketlist.comments.map(comment =>
                      (comment.id === action.comment.id
                        ? action.comment
                        : comment)),
                  ],
                };
              }

              return bucketlist;
            }),
          ],
        },
      };

    case types.DELETE_COMMENT:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.LIKE:
      return {
        ...state,
        [action.dataType]: {
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
        },
      };

    case types.UNLIKE:
      return {
        ...state,
        [action.dataType]: {
          bucketlists: [
            ...state[action.dataType].bucketlists.map(bucketlist => ({
              ...bucketlist,
              likes: [
                ...bucketlist.likes.filter(like => like.id !== action.like.id),
              ],
            })),
          ],
        },
      };

    case types.SEARCH_BUCKETLISTS:
      return {
        ...state,
        [action.dataType]: { searchResults: action.bucketlists },
      };

    case types.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        [action.dataType]: { searchResults: [] },
      };

    case types.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
