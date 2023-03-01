import { Paper, Grid, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { useState, useEffect } from 'react';

const Comment = (props) => {
    const [rating, setRating] = useState(props.comment.rating);
    const [currentVote, setCurrentVote] = useState(0);

    const getVoteFromProps = () => {
        if (props.comment.votes === undefined || props.comment.votes === null) return 0;
        // get user's current vote on the comment
        if (props.user != null) {
            const found = props.comment.votes.findIndex(vote => vote.userId === props.user.id);
            if (found !== -1) {
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
        fetch("../api/posts/comments/votes/" + props.comment._id, {
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

    // returns a formatted timestamp of when the comment was last edited if it has been
    const lastEdited = (ts) => {
        if (props.comment.lastEdited == null) return null;
        const date = new Date(ts);
        const dtFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'});
        return (
        <Typography 
            sx={{ pt: 0.5, pr: 3 }} 
            variant="overline" 
            color="lightgrey"
        >
            {`Edited ${dtFormat.format(date)}`}
        </Typography>
        );
    }

    // returns a button to edit this comment if the current user is its author
    const editButton = () => {
        if (props.user == null) return null;
        if (props.comment.userId === props.user.id) {
            return (
            <Button
                component={Link} 
                to={`../comments/edit/${props.comment._id}`} 
                variant="text"
                sx={{ mr: 2 }}
            >
                Edit
            </Button>
            );
        }
        return null;
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
                {editButton()}
                {lastEdited(props.comment.lastEdited)}
                <Typography sx={{ pt: 1, pr: 3 }} variant="button" color="lightgrey">{(props.comment != null) ? props.comment.posterName : "-"}</Typography>
                <IconButton disabled={props.user == null || currentVote === 1} onClick={() => handleVote(1)} aria-label="upvote">
                    <KeyboardArrowUp color={(currentVote === 1) ? "primary" : "default"} />
                </IconButton>
                <Typography sx={{ pt: 1, px: 1 }} variant="button" color="secondary">{rating}</Typography>
                <IconButton disabled={props.user == null || currentVote === -1} onClick={() => handleVote(-1)} aria-label="downvote">
                    <KeyboardArrowDown color={(currentVote === -1) ? "primary" : "default"} />
                </IconButton>
            </Grid>
        </Paper>
    )
}

export default Comment