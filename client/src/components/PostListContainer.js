import { useState, useEffect } from 'react';
import PostList from "./PostList";

export const PostListContainer = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let mounted = true;
        async function getPosts() {
            const data = await fetch("/api/posts")
                .then(res => res.json());
            const listItems = data.map(post => <li key={post._id}>{post.snippet}</li>);

            if (mounted) {
                setPosts(listItems);
            }
        }
        getPosts();

        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <PostList posts={posts} />
        </div>
    )
}

export default PostListContainer