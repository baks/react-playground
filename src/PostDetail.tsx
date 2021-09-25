import { useEffect, useState } from "react";
import { createPostTitle, Post } from "./domain";
import { Action } from "./postsReducer";

export const PostDetail = ({ post, dispatch }: 
    { post: Post, dispatch: (action: Action) => void }) => {
    if (!post) return null;

    const onDelete = async (postId: number) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { method: "DELETE" });

        if(response.ok) {
            dispatch({ type: 'DELETE_SELECTED_POST' });
        } else {
            alert('DELETING SELECTED POST ERROR');
        }
    }

    const onUpdateTitle = async () => {
        const newTitle = createPostTitle("new title");

        if(newTitle.kind === "failure") {
            alert('invalid new title for post');
            return;
        }

        const response =
            await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, 
                { method: "PATCH", body: JSON.stringify({ title: newTitle })});

        if(response.ok) {
            dispatch({ type: 'UPDATE_SELECTED_POST_TITLE', payload: newTitle.data });
        } else {
            alert('UPDATING SELECTED POST TITLE ERROR');
        }
    }


    return <div>
        <header className="post__header">{post.title}</header>
        <div className="post__actions">
            <button onClick={() => onDelete(post.id)}>Delete post</button>
            <button onClick={() => onUpdateTitle()}>Update title</button>
        </div>
        <section>
            <span>{post.body}</span>
            <Comments postId={post.id} />
        </section>
    </div>
}

type Comment = Readonly<{
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}>;

const Comments = ({ postId } : { postId: number}) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const data = await response.json();

            setComments(data as Comment[]);
        }

        fetchComments();
    }, [postId]);

    if(postId <= 0) return null;
    return <ul>
        {comments.map(comment => 
            <li>
                {comment.email} : {comment.body}
            </li>)}
    </ul>
}