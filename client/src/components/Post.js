import { Paper, Grid, Button, IconButton, Typography } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Comment } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
// code blocks use javascript as the language for syntax highlighting
hljs.registerLanguage('javascript', javascript);

const Post = (props) => {
    const [rating, setRating] = useState(props.post.rating);
    const [currentVote, setCurrentVote] = useState(0);

    const getVoteFromProps = () => {
        if (props.post.votes === undefined || props.post.votes == null) return 0;
        // get user's current vote on the post
        if (props.user != null) {
            const found = props.post.votes.findIndex(vote => vote.userId === props.user.id);
            if (found !== -1) {
                return props.post.votes[found].vote;
            }
        }
        return 0;
    }

    useEffect(() => {
        let mounted = true;
        // update the state of the rating and the user's vote on the post
        const vote = getVoteFromProps();
        if (mounted) {
            setCurrentVote(vote);
            setRating(props.post.rating);
        }
        hljs.highlightAll();
        return () => { mounted = false; }
    }, [props.user, props.post]);

    const handleVote = (vote) => {
        const authToken = localStorage.getItem("auth_token");
        // if this post component is shown in a list (i.e. the front page), the fetch path needs to be different
        const fetchPath = (props.inList) ? 'api/posts/votes/' : '../api/posts/votes/';
        // submit vote
        fetch(fetchPath + props.post._id, {
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
                    // update rating visually
                    setRating(data.rating);
                    setCurrentVote(data.userVote);                 
                } else {
                    toast.error("Vote submission failed");
                }
            });
    }

    const commentsButton = () => {
        // if this post component is shown in a list (i.e. the front page), it renders the comments button
        if (props.inList) {
            return <Button endIcon={<Comment/>} variant="outlined" component={Link} to={"/posts/" + props.post._id}>
                COMMENTS
            </Button>            
        } else {
            return <></>;
        }
    }

    // returns a formatted timestamp of when the post was last edited if it has been
    const lastEdited = (ts) => {
        if (props.post.lastEdited == null) return null;
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

    return (
        <Paper sx={{ px: 4, pt: 4, pb: 2, my: 2, width: 1 }}>
            <Typography sx={{ pb: 4 }} variant="h6">{props.post.title}</Typography>
            <pre>
                <code className="hljs language-javascript">
                    {props.post.snippet}
                </code>
            </pre>
            <Grid sx={{ pt: 2 }} container justifyContent="end">
                {lastEdited(props.post.lastEdited)}
                <Typography sx={{ pt: 1, pr: 3 }} variant="button" color="lightgrey">{(props.post != null) ? props.post.posterName : "Username"}</Typography>
                <IconButton disabled={props.user == null} onClick={() => handleVote(1)} aria-label="upvote">
                    <KeyboardArrowUp color={(currentVote === 1) ? "primary" : "default"} />
                </IconButton>
                <Typography sx={{ pt: 1, px: 1 }} variant="button" color="secondary">{rating}</Typography>
                <IconButton disabled={props.user == null} onClick={() => handleVote(-1)} aria-label="downvote">
                    <KeyboardArrowDown color={(currentVote === -1) ? "primary" : "default"} />
                </IconButton>
                {commentsButton()}
            </Grid>
        </Paper>
    )
}

export default Post