import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function PostForm(props) {
    const [post, setPost] = useState({});

    const handleChange = (e) => {
        setPost({...post, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("auth_token");
        // submit post
        fetch('api/posts', {
            method: "POST",
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
                    console.log("Post submitted succesfully.");
                    window.location.reload();
                } else {
                    console.log("Post submission failed.");
                }
            });  
    }

    return (
        <form onChange={handleChange} onSubmit={handleSubmit} className="post-form">
            <TextField 
                disabled={props.user == null}
                id="title"
                label="Title"
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                disabled={props.user == null}
                id="snippet"
                label={(props.user != null) ? "Code snippet" : "Log in to post snippets"}
                multiline
                minRows={4}
                fullWidth
            />
            <Grid container justifyContent="end">
                <Button disabled={props.user == null} variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Post snippet</Button>              
            </Grid>
        </form>
    )
}

export default PostForm