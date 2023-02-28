import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CommentForm from './CommentForm';
import Post from './Post';

export const PostContainer = (props) => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let mounted = true;
        // gets post info
        async function getPost() {
            const post = await fetch("/api/posts/" + postId)
                .then(res => res.json())
                .then(getComments());

            if (mounted) setPost(post);
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
                            <div className="comment-text">
                                {comment.content}
                            </div>
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
            <div className="column-wrapper">
                <Post post={post} user={props.user} inList={false} />        
            </div>
            <CommentForm postId={postId} user={props.user}/>
            <ul className="comment-list">
                {comments}
            </ul>
        </Stack>
    )
}

export default PostContainer