import { useState, useEffect } from 'react';
import PostList from "./PostList";

export const PostListContainer = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let mounted = true;
        // get all posts
        async function getPosts() {
            const data = await fetch("api/posts")
                .then(res => res.json());

            if (mounted) setPosts(data);
        }
        getPosts();

        return () => { mounted = false; }
    }, []);

    return (
        <div className="list-wrapper">
            <PostList posts={posts} />
        </div>
    )
}

export default PostListContainer