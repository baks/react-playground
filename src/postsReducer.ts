import { Optional, Post, PostTitle } from "./domain";

type State = Readonly<{
    selectedPost: Optional<Post>;
}>;

type SetSelectedPostAction = { type: 'SET_SELECTED_POST', payload: Optional<Post> };
type UpdateSelectedPostTitleAction = { type: 'UPDATE_SELECTED_POST_TITLE', payload: PostTitle };
type DeleteSelectedPostAction = { type: 'DELETE_SELECTED_POST' };

export type Action = SetSelectedPostAction | UpdateSelectedPostTitleAction | DeleteSelectedPostAction;

export const postsReducer = (state: State, action: Action) : State => {
    switch(action.type) {
        case 'SET_SELECTED_POST':
            return { ...state, selectedPost: action.payload };
        case 'UPDATE_SELECTED_POST_TITLE':
            const updatedPost = state.selectedPost ? { ...state.selectedPost, title: action.payload } : null;
            return { 
                ...state, 
                selectedPost: updatedPost
            };
        case 'DELETE_SELECTED_POST':
            return { ...state, selectedPost: null };
        default:
            return state;
    }
};