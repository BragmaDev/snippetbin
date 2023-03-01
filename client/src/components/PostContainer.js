import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Grid, Button } from '@mui/material';
import { Stack } from '@mui/system';
import CommentForm from './CommentForm';
import Post from './Post';
import Comment from './Comment';

export const PostContainer = (props) => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let mounted = true;
        // gets post info
        async function getPost() {
            const post = await fetch("/api/posts/" + postId)
                .then(res => res.json());
            if (mounted) setPost(post);
        }
        // gets post comments
        async function getComments() {
            const comments = await fetch("/api/posts/" + postId + "/comments")
                .then(res => res.json())
                .then(json => json.map(comment => {
                    // return comments inside li elements
                    return <li key={comment._id}>   
                        <Comment comment={comment} user={props.user} />
                    </li>
                }));
            
            if (mounted) setComments(comments);
        }
        getPost();
        getComments();

        return () => { mounted = false; }
    }, [postId, props.user]);

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