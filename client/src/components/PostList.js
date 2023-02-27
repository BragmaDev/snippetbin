import Paper from '@mui/material/Paper';

function PostList({ posts }) {
    const postPapers = posts.map(post => {
        return <li key={post._id}>
            <Paper
                className="post-list-paper"
                variant="outlined"
                sx={{ p: 4, my: 2 }}
            > 
                <pre>
                    <code>
                        {post.snippet}
                    </code>
                </pre>
            </Paper>
        </li>      
    });

    return (
        <ul>
            {postPapers}
        </ul>
    )
}

export default PostList