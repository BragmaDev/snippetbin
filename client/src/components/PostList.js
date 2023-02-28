import { Paper, Grid, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function PostList({ posts }) {
    const handleUpvote = (postId) => {
        console.log(postId);
        return;
    }

    const handleDownvote = (postId) => {
        console.log(postId);
        return;
    }

    const postPapers = posts.map(post => {
        return <li key={post._id}>
            <Paper className="post-list-paper" sx={{ px: 4, pt: 4, pb: 2, my: 2 }}> 
                <pre>
                    <code>
                        {post.snippet}
                    </code>
                </pre>
                <Grid container justifyContent="end">
                    <Typography sx={{ pt: 1, pr: 1}}variant="button" display="block" gutterBottom>{post.rating}</Typography>
                    <IconButton onClick={() => handleUpvote(post._id)} aria-label="upvote"><KeyboardArrowUp color="default"/></IconButton>
                    <IconButton onClick={() => handleDownvote(post._id)} aria-label="downvote"><KeyboardArrowDown/></IconButton>
                    <Button component={Link} to={"/posts/"+post._id} color="secondary">Comments</Button>
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