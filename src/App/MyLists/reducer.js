import * as types from '../Common/constants';

let bucketList;

const initialState = {
  bucketlists: [],
  nextOffset: null,
  prevOffset: null,
  newBucketlists: [],
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_BUCKETLISTS_SUCCESS:
      return {
        ...action.data,
      };

    case types.LOAD_MORE_BUCKETLISTS:
      return {
        ...state,
        nextOffset: action.data.nextOffset,
        prevOffset: action.data.prevOffset,
        bucketlists: [
          ...new Set([
            ...new Set(state.bucketlists),
            ...action.data.bucketlists,
          ]),
        ],
      };

    case types.CREATE_BUCKETLIST_SUCCESS:
      bucketList = {
        ...action.bucketlist,
        items: [],
        comments: [],
        likes: [],
      };

      return {
        ...state,
        bucketlists: [bucketList, ...state.bucketlists],
      };

    case types.UPDATE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map(bucketlist =>
            (bucketlist.id === action.bucketlist.id
              ? action.bucketlist
              : {
                ...bucketlist,
                items: bucketlist.items || [],
                comments: bucketlist.comments || [],
                likes: bucketlist.likes || [],
              })),
        ],
      };

    case types.DELETE_BUCKETLIST_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.filter(bucketlist => bucketlist.id !== action.bucketlist.id),
        ],
      };

    case types.CREATE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                items: [action.item, ...bucketlist.items],
              };
            }

            return bucketlist;
          }),
        ],
      };

    case types.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
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
      };

    case types.DELETE_ITEM_SUCCESS:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
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
      };

    case types.ADD_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.bucketlist.id) {
              return {
                ...bucketlist,
                comments: [action.comment, ...bucketlist.comments],
              };
            }

            return bucketlist;
          }),
        ],
      };

    case types.EDIT_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
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
      };

    case types.DELETE_COMMENT:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
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
      };

    case types.LIKE:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.like.bucketlistId) {
              return {
                ...bucketlist,
                likes: [action.like, ...bucketlist.likes],
              };
            }

            return bucketlist;
          }),
        ],
      };

    case types.UNLIKE:
      return {
        ...state,
        bucketlists: [
          ...state.bucketlists.map((bucketlist) => {
            if (bucketlist.id === action.like.bucketlistId) {
              return {
                ...bucketlist,
                likes: [
                  ...bucketlist.likes.filter(like => like.id !== action.like.id),
                ],
              };
            }

            return bucketlist;
          }),
        ],
      };

    default:
      return state;
  }
};
