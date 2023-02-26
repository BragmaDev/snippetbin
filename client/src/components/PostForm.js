import React from 'react'

function PostForm() {
  return (
    <form>
        <div>
            <label htmlFor="snippet">Snippet</label>
            <input id="snippet" type="text" />
        </div>
        <button type="submit">Post snippet</button>
    </form>
  )
}

export default PostForm