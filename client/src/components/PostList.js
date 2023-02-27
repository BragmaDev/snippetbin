import Paper from '@mui/material/Paper';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
    const postPapers = posts.map(post => {
        return <li key={post._id}>
            <Paper className="post-list-paper" sx={{ px: 4, pt: 4, pb: 2, my: 2 }}> 
                <pre>
                    <code>
                        {post.snippet}
                    </code>
                </pre>
                <Grid container justifyContent="end">
                    <Button component={Link} to={"/posts/"+post._id}>Comments</Button>
                </Grid>
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