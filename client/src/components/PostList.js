import Paper from '@mui/material/Paper';

function PostList({ posts }) {
    const postPapers = posts.map(post => {
        return <Paper
            className="post-list-paper"
            variant="outlined" 
            key={post._id}
            sx={{ p: 4, my: 2 }}
        > 
            <pre>
                <code>
                    {post.snippet}
                </code>
            </pre>
        </Paper>
    })

    return (
        <ul>
            {postPapers}
        </ul>
    )
}

export default PostList