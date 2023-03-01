import { useState, useEffect } from 'react';
import { Pagination, Stack } from '@mui/material';
import PostList from "./PostList";

export const PostListContainer = (props) => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let mounted = true;
        // get all posts
        async function getPosts() {
            const data = await fetch(`api/posts?page=${page}`)
                .then(res => res.json());
            if (mounted) {
                setPosts(data.posts);
                setTotalPages(data.total);
            } 
        }
        getPosts();

        return () => { mounted = false; }
    }, [page]);
    
    const handlePageChange = (e, p) => {
        setPage(p - 1);
    }

    return (
        <div className="column-wrapper">
            <PostList posts={posts} user={props.user} />
            <Stack alignItems="center">
                <Pagination onChange={handlePageChange} count={totalPages} variant="outlined" shape="rounded" />
            </Stack>
        </div>
    )
}

export default PostListContainer