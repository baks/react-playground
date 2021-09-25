import { Optional, Post, PostTitle } from "./domain";

type State = Readonly<{
    posts: Post[];
    selectedPost: Optional<Post>;
}>;

type SetPostsAction = { type: 'SET_POSTS', payload: Post[] };
type SetSelectedPostAction = { type: 'SET_SELECTED_POST', payload: Optional<Post> };
type UpdateSelectedPostTitleAction = { type: 'UPDATE_SELECTED_POST_TITLE', payload: PostTitle };
type DeleteSelectedPostAction = { type: 'DELETE_SELECTED_POST' };

export type Action = SetPostsAction | SetSelectedPostAction | UpdateSelectedPostTitleAction | DeleteSelectedPostAction;

export const postsReducer = (state: State, action: Action) : State => {
    switch(action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload }
        case 'SET_SELECTED_POST':
            return { ...state, selectedPost: action.payload };
        case 'UPDATE_SELECTED_POST_TITLE':
            const updatedPost = state.selectedPost ? { ...state.selectedPost, title: action.payload } : null;
            return { 
                ...state, 
                posts: updatedPost ? state.posts.map(x => x.id === state.selectedPost?.id ? updatedPost : x) : state.posts,
                selectedPost: updatedPost
            };
        case 'DELETE_SELECTED_POST':
            return { ...state, posts: state.posts.filter(x => x.id !== state.selectedPost?.id), selectedPost: null };
        default:
            return state;
    }
};