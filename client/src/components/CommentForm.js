import { useState } from 'react';

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
            <div>
                <label htmlFor="content">Comment</label>
                <textarea id="content" />
            </div>
            <button type="submit">Post comment</button>
        </form>
    )
}

export default CommentForm