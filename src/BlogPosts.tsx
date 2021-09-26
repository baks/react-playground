import { useReducer, useState } from "react";
import usePosts from "./hooks/usePosts";
import { PostDetail } from "./PostDetail";
import { postsReducer } from "./postsReducer";

const maxPostPage = 10;

export const BlogPosts = () => {
    const [state, dispatch] = useReducer(postsReducer, { selectedPost: null })
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { data: posts, isLoading, isError, error } = usePosts(currentPage);

    const previousPageDisabled = currentPage <= 1;
    const nextPageDisabled = currentPage >= maxPostPage;
    const previousPage = () => setCurrentPage(prev => prev - 1);
    const nextPage = () => setCurrentPage(prev => prev + 1);

    if(isLoading) return <span>Loading data....</span>;
    if(isError) return <span>{(error as any).toString()}</span>;

    return <>
        <ul>
            {
                posts?.map(post =>
                    <li>
                        <button onClick={() => dispatch({ type: 'SET_SELECTED_POST', payload: post })} className="post__title">
                            {post.title ?? "No title"}
                        </button>
                    </li>
                )}
        </ul>
        <div className="posts__pagination">
            <button onClick={previousPage} disabled={previousPageDisabled}>
                Previous page
            </button>
            <span>Page {currentPage}</span>
            <button onClick={nextPage} disabled={nextPageDisabled}>
                Next page
            </button>
        </div>
        {state.selectedPost && <PostDetail post={state.selectedPost} dispatch={dispatch} />}
    </>
}