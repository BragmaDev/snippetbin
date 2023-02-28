import { useState } from 'react';
import { Stack, Grid, TextField, Button } from '@mui/material';

function CommentForm(props) {
    const [content, setContent] = useState("");

    const handleChange = (e) => {
        if (e.target.id === "content") setContent(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem("auth_token");
        // submit comment
        fetch('../api/posts/' + props.postId + '/comments', {
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
                <TextField
                    disabled={props.user == null}
                    className="comment-field" 
                    label={(props.user != null) ? "Comment" : "Log in to comment"} 
                    id="content" 
                    multiline 
                    minRows={2}
                ></TextField>
                <Grid container justifyContent="center">
                    <Button disabled={props.user == null} variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Post comment</Button>              
                </Grid>
            </Stack>         
        </form>
    );  
}

export default CommentForm