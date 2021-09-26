import { useQuery } from "react-query";
import { Post } from "../domain";

const fetchPosts = async (page: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
    const json = await response.json();
    return json as Post[];
}

const usePosts = (page: number) => useQuery<Post[]>(["posts", page], () => fetchPosts(page));

export default usePosts;