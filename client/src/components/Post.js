import { Paper, Grid, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Post = (props) => {
    const [rating, setRating] = useState(props.post.rating);

    const handleVote = (vote) => {
        const authToken = localStorage.getItem("auth_token");
        // submit vote
        fetch('api/posts/' + props.post._id, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ vote }),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => { 
                if (data.success === true) {
                    console.log("Vote submitted succesfully.");
                    // update rating visually
                    setRating(props.post.rating + vote)
                } else {
                    console.log("Vote submission failed.");
                }
            });
    }

    return (
        <Paper className="post-list-paper" sx={{ px: 4, pt: 4, pb: 2, my: 2 }}>
            <pre>
                <code>
                    {props.post.snippet}
                </code>
            </pre>
            <Grid container justifyContent="end">
                <Typography sx={{ pt: 1, pr: 1 }} variant="button" color="lightgrey">{rating}</Typography>
                <IconButton onClick={() => handleVote(1)} aria-label="upvote"><KeyboardArrowUp color="default" /></IconButton>
                <IconButton onClick={() => handleVote(-1)} aria-label="downvote"><KeyboardArrowDown /></IconButton>
                <Button component={Link} to={"/posts/" + props.post._id} color="secondary">Comments</Button>
            </Grid>
        </Paper>
    )
}

export default Post