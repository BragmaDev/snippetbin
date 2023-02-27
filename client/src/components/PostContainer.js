import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

export const PostContainer = () => {
    const { postId } = useParams();
    const [snippet, setSnippet] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let mounted = true;
        // gets post info
        async function getPost() {
            const post = await fetch("/api/posts/" + postId)
                .then(res => res.json())
                .then(getComments());

            if (mounted) setSnippet(post.snippet);
        }
        // gets post comments
        async function getComments() {
            const comments = await fetch("/api/posts/" + postId + "/comments")
                .then(res => res.json())
                .then(json => json.map(comment => {
                    return <li key={comment._id}>{comment.content}</li>
                }));
            
            if (mounted) setComments(comments);
        }
        getPost();

        return () => { mounted = false; }
    }, []);

    return (
        <div>
            <pre>
                <code>
                    {snippet}
                </code>
            </pre>
            <CommentForm postId={postId}/>
            <ul>
                {comments}
            </ul>
        </div>
    )
}

export default PostContainer