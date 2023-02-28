import { useState, useEffect } from 'react';
import PostList from "./PostList";

export const PostListContainer = (props) => {
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
        <div className="column-wrapper">
            <PostList posts={posts} user={props.user} />
        </div>
    )
}

export default PostListContainer