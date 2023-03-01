import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function PostEditForm(props) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [post, setPost] = useState({});
 
    useEffect(() => {
        let mounted = true;
        // gets post info
        async function getPost() {
            const post = await fetch("/api/posts/" + postId)
                .then(res => res.json());
            if (mounted) setPost(post);
        }
        getPost();

        return () => { mounted = false; }
    }, [postId, props.user]);  

    const handleChange = (e) => {
        // update the edited post's info in variable
        setPost({...post, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("auth_token");
        // submit edit
        fetch(`../../api/posts/${postId}`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ ...post }),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true) {
                    console.log("Post edited succesfully.");
                    navigate("/", { replace: true });
                } else {
                    console.log("Post edit submission failed.");
                }
            });  
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit} className="post-form">
            <TextField 
                disabled={props.user == null}
                id="title"
                placeholder='Title'
                fullWidth
                sx={{ mb: 2 }}
                value={post.title}
            ></TextField>
            <TextField
                disabled={props.user == null}
                id="snippet"
                placeholder='Code snippet'
                multiline
                minRows={4}
                fullWidth
                value={post.snippet}
            />
            <Grid container justifyContent="end">
                <Button disabled={props.user == null} variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Edit post</Button>              
            </Grid>
        </form>
    )
}

export default PostEditForm