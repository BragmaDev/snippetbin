import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CommentForm from './CommentForm';

export const PostContainer = (props) => {
    const { postId } = useParams();
    const [snippet, setSnippet] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let mounted = true;
        // gets post info
        async function getPost() {
            const post = await fetch("/api/posts/" + postId)
                .then(res => res.json())
                .then(getComments());

            if (mounted) setSnippet(post.snippet);
        }
        // gets post comments
        async function getComments() {
            const comments = await fetch("/api/posts/" + postId + "/comments")
                .then(res => res.json())
                .then(json => json.map(comment => {
                    return <li key={comment._id}>   
                        <Paper 
                            className="comment-paper" 
                            sx={{ px: 2, py: 2, my: 2 }}
                            variant="outlined"
                        >
                            {comment.content}
                        </Paper>
                    </li>
                }));
            
            if (mounted) setComments(comments);
        }
        getPost();

        return () => { mounted = false; }
    }, [postId]);

    return (
        <Stack alignItems="center">
            <Paper sx={{ p: 4, my: 2 }}>
                <pre>
                    <code>
                        {snippet}
                    </code>
                </pre>
            </Paper>           
            <CommentForm postId={postId} loggedIn={props.loggedIn}/>
            <ul className="comment-list">
                {comments}
            </ul>
        </Stack>
    )
}

export default PostContainer