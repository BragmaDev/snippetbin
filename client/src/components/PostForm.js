import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostForm() {
    const navigate = useNavigate();
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
                <label htmlFor="snippet">Snippet</label>
                <input id="snippet" type="text" />
            </div>
            <button type="submit">Post snippet</button>
        </form>
    )
}

export default PostForm