import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function PostForm() {
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
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <div>
                <TextField
                    id="snippet"
                    label="Code snippet"
                    multiline
                    minRows={4}
                    defaultValue=""
                />
            </div>
            <Button variant="contained" type="submit">Post snippet</Button>
        </form>
    )
}

export default PostForm