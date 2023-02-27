import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function PostForm(props) {
    const [snippet, setSnippet] = useState("");

    const handleChange = (e) => {
        if (e.target.id === "snippet") setSnippet(e.target.value);
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
            body: JSON.stringify({ snippet }),
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

    if (props.loggedIn) {
        return (
            <form onChange={handleChange} onSubmit={handleSubmit} className="post-form">
                <div>
                    <TextField
                        id="snippet"
                        label="Code snippet"
                        multiline
                        minRows={4}
                        defaultValue=""
                        fullWidth
                    />
                </div>
                <Grid container justifyContent="end">
                    <Button variant="contained" type="submit" sx={{ mt: 2, mb: 4 }}>Post snippet</Button>              
                </Grid>
            </form>
        )
    } else {
        return (
            <form onChange={handleChange} onSubmit={handleSubmit} className="post-form">
                <div>
                    <TextField
                        disabled
                        id="snippet"
                        label="Log in to post snippets"
                        multiline
                        minRows={4}
                        defaultValue=""
                        fullWidth
                    />
                </div>
                <Button disabled variant="contained" type="submit">Post snippet</Button>
            </form>
        )
    }
    
}

export default PostForm