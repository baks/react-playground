import { useQuery } from "react-query";
import { Comment } from "./domain";

export const Comments = ({ postId } : { postId: number}) => {
    const fetchComments = async (postId: number) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const data = await response.json();
        return data as Comment[];
    }
    
    const { data: comments, isLoading, isError, error } = 
        useQuery([ "comments", postId ], () => fetchComments(postId));


    if(postId <= 0) return null;
    if(isLoading) return <>Loading comments...</>
    if(isError) return <>{(error as any).toString()}</>
    return <ul>
        {comments?.map(comment => 
            <li>
                {comment.email} : {comment.body}
            </li>)}
    </ul>
}