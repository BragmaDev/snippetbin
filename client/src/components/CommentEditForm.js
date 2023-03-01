import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

function CommentEditForm(props) {
    const navigate = useNavigate();
    const { commentId } = useParams();
    const [comment, setComment] = useState({});

    useEffect(() => {
        let mounted = true;
        // gets comment info
        async function getComment() {
            const comment = await fetch("/api/posts/comments/" + commentId)
                .then(res => res.json());
            if (mounted) setComment(comment);
        }
        getComment();

        return () => { mounted = false; }
    }, [commentId, props.user]);

    const handleChange = (e) => {
        // update the edited comment's info in variable
        setComment({ ...comment, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("auth_token");
        // submit edit
        fetch(`../../api/posts/comments/${commentId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ ...comment }),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    toast.success("Comment edited successfully");
                    navigate(`/posts/${comment.postId}`, { replace: true });
                } else {
                    toast.error("Edit submission failed");
                }
            });
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit} className="post-form">
            <TextField
                disabled={props.user == null}
                id="content"
                placeholder='Comment'
                multiline
                minRows={4}
                fullWidth
                value={comment.content}
            />
            <Grid container justifyContent="end">
                <Button disabled={props.user == null} variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Edit comment</Button>
            </Grid>
        </form>
    )
}

export default CommentEditForm