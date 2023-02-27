import { useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';

function CommentForm({ postId }) {
    const [content, setContent] = useState("");

    const handleChange = (e) => {
        if (e.target.id === "content") setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("auth_token");
        // submit comment
        fetch('../api/posts/' + postId + '/comments', {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ content }),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true) {
                    console.log("Comment submitted succesfully.");
                    window.location.reload();
                } else {
                    console.log("Comment submission failed.");
                }
            });  
    }
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <Stack sx={{ width: 300 }} alignItems="center">
                <TextField className="comment-field" label="Comment" id="content" multiline minRows={2}></TextField>
                <Grid container justifyContent="center">
                    <Button variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Post comment</Button>              
                </Grid>
            </Stack>         
        </form>
    )
}

export default CommentForm