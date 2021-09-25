import { useEffect, useReducer } from "react";
import { Post } from "./domain";
import { PostDetail } from "./PostDetail";
import { postsReducer } from "./postsReducer";

export const BlogPosts = () => {
    const [state, dispatch] = useReducer(postsReducer, { posts: [], selectedPost: null })

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const json = await response.json();
            dispatch({ type: 'SET_POSTS', payload: json as Post[]})
        }

        getPosts();
    }, [])

    return <>
        <ul>
            {
                state.posts.map(post =>
                    <li>
                        <button onClick={() => dispatch({ type: 'SET_SELECTED_POST', payload: post })} className="post__title">
                            {post.title ?? "No title"}
                        </button>
                    </li>
                )}
        </ul>
        {state.selectedPost && <PostDetail post={state.selectedPost} dispatch={dispatch} />}
    </>
}