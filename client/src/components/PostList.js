import Post from "./Post";

function PostList(props) {
    // make a list of li elements with post components inside
    const listItems = props.posts.map(post => {
        return <li key={post._id}>
            <Post post={post} user={props.user} inList={true}/>
        </li>      
    });

    return (
        <ul>
            {listItems}
        </ul>
    )
}

export default PostList