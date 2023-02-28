import { Paper, Grid, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Post = (props) => { 
    const [rating, setRating] = useState(props.post.rating);
    const [currentVote, setCurrentVote] = useState(0);

    const getVoteFromProps = () => {
        // get user's current vote on the post
        if (props.user != null) {
            const found = props.post.votes.findIndex(vote => vote.userId === props.user.id);
            if (found != -1) return props.post.votes[found].vote;
        }
        return 0;
    }

    useEffect(() => {
        let mounted = true;
        const vote = getVoteFromProps();
        if (mounted) setCurrentVote(vote);
        return () => { mounted = false; }
    }, [props.user]);

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
                    if (data.replacedOldVote === false) {
                        setRating(rating + vote);
                    } else {
                        setRating(rating + (2 * vote));
                    }
                    setCurrentVote(vote);                   
                } else {
                    console.log("Vote submission failed.");
                }
            });
    }

    return (
        <Paper className="post-list-paper" sx={{ px: 4, pt: 4, pb: 2, my: 2 }}>
            <Typography sx={{ pb: 2 }} variant="h6" color="primary">{props.post.title}</Typography>
            <pre>
                <code>
                    {props.post.snippet}
                </code>
            </pre>
            <Grid container justifyContent="end">
                <Typography sx={{ pt: 1, pr: 1 }} variant="button" color="lightgrey">{rating}</Typography>
                <IconButton disabled={props.user == null || currentVote == 1} onClick={() => handleVote(1)} aria-label="upvote">
                    <KeyboardArrowUp color={(currentVote == 1) ? "primary" : "default"} />
                </IconButton>
                <IconButton disabled={props.user == null || currentVote == -1} onClick={() => handleVote(-1)} aria-label="downvote">
                    <KeyboardArrowDown color={(currentVote == -1) ? "primary" : "default"} />
                </IconButton>
                <Button component={Link} to={"/posts/" + props.post._id} color="secondary">Comments</Button>
            </Grid>
        </Paper>
    )
}

export default Post