import { useState, useEffect } from 'react';
import { Pagination, Stack, TextField, Typography } from '@mui/material';
import PostList from "./PostList";
import PostForm from './PostForm';

export const PostListContainer = (props) => {
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newPost, setNewPost] = useState(""); // used to update list when submitting new post

    useEffect(() => {
        let mounted = true;
        // get all posts
        async function getPosts() {
            const data = await fetch(`api/posts?page=${page}&search=${searchTerm}`)
                .then(res => res.json());
            if (mounted) {
                setPosts(data.posts);
                setTotalPages(data.total);
            } 
        }
        getPosts();

        return () => { mounted = false; }
    }, [page, searchTerm, newPost]);
    
    // change page when pager is used
    const handlePageChange = (e, p) => {
        setPage(p - 1);
    }

    // change search term
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (<>
        <PostForm user={props.user} setNewPost={setNewPost} />
        <div className="column-wrapper">
            <Typography variant="h5">All snippets</Typography>
            <TextField 
                label="Search"
                sx={{ my: 2, width: 1 }}
                onChange={handleSearchChange}
                variant="filled"
            />
            <PostList posts={posts} user={props.user} />     
            <Stack alignItems="center">
                <Pagination 
                    onChange={handlePageChange} 
                    count={totalPages} 
                    variant="outlined" 
                    shape="rounded"
                    sx={{ my: 2 }}
                />
            </Stack>
        </div>
        </>
    )
}

export default PostListContainer