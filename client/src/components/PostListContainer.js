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
            // turn response into a list of li elements
            const listItems = data.map(post => {
                return <li key={post._id}>
                    <pre>
                        <code>{post.snippet}</code>
                    </pre>
                </li>
            });

            if (mounted) setPosts(listItems);
        }
        getPosts();

        return () => { mounted = false; }
    }, []);

    return (
        <div>
            <PostList posts={posts} />
        </div>
    )
}

export default PostListContainer