import { useState } from 'react'

function PostForm() {
    const [snippet, setSnippet] = useState("")

    const handleChange = (e) => {
        if (e.target.id === "email") setSnippet(e.target.value);
    }

    const handleSubmit = (e) => {
        const authKey = localStorage.getItem("auth_key");
        // submit post
        fetch('api/posts', {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + authKey
            },
            body: JSON.stringify({ snippet }),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true) {
                    console.log("Post submitted succesfully.");
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