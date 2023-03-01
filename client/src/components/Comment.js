import { Paper, Grid, IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const Comment = (props) => {
    const [rating, setRating] = useState(props.comment.rating);
    const [currentVote, setCurrentVote] = useState(0);

    const getVoteFromProps = () => {
        if (props.comment.votes == undefined || props.comment.votes == null) return 0;
        // get user's current vote on the comment
        if (props.user != null) {
            const found = props.comment.votes.findIndex(vote => vote.userId === props.user.id);
            if (found != -1) {
                return props.comment.votes[found].vote;
            }
        }
        return 0;
    }

    useEffect(() => {
        let mounted = true;
        // update the state of the rating and the user's vote on the comment
        const vote = getVoteFromProps();
        if (mounted) {
            setCurrentVote(vote);
            setRating(props.comment.rating);
        }
        return () => { mounted = false; }
    }, [props.user, props.comment]);

    const handleVote = (vote) => {
        const authToken = localStorage.getItem("auth_token");
        // submit vote
        fetch("../api/posts/comments/" + props.comment._id, {
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
        <Paper 
            className="comment-paper" 
            sx={{ px: 2, py: 2, my: 2 }}
            variant="outlined"
        >
            <div className="comment-text">
                {props.comment.content}
            </div>
            <Grid container justifyContent="end">
                <Typography sx={{ pt: 1, pr: 3 }} variant="button" color="lightgrey">{(props.user != null) ? props.comment.posterName : "Username"}</Typography>
                <IconButton disabled={props.user == null || currentVote == 1} onClick={() => handleVote(1)} aria-label="upvote">
                    <KeyboardArrowUp color={(currentVote == 1) ? "primary" : "default"} />
                </IconButton>
                <Typography sx={{ pt: 1, px: 1 }} variant="button" color="secondary">{rating}</Typography>
                <IconButton disabled={props.user == null || currentVote == -1} onClick={() => handleVote(-1)} aria-label="downvote">
                    <KeyboardArrowDown color={(currentVote == -1) ? "primary" : "default"} />
                </IconButton>
            </Grid>
        </Paper>
    )
}

export default Comment