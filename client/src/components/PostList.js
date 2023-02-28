import Post from "./Post";

function PostList({ posts }) {
    const listItems = posts.map(post => {
        return <li key={post._id}>
            <Post post={post}/>
        </li>      
    });

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default PostList