const APIURL = '/posts';

const throwError = async (resp) => {
    const unknownErr = { errorMessage: 'Unknown error' };
    try {
        const body = await resp.json();
        if (body.message !== undefined) {
            let err = { errorMessage: body.message };
            throw err;
        } else {
            throw unknownErr;
        }
    } catch (e) {
        throw unknownErr;
    }
};

//A function that gets all of the posts from the database using a fetch
const getPosts = async() => {
      const resp = await fetch(APIURL);
      if(!resp.ok){
        throwError(resp);
      } else{
        return resp.json(); //we return the json of what the fetch returns.
      }
}
//A function that adds a new post to the database using a fetch
const addPost = async (post) => {
  const resp = await fetch(APIURL, {
     method: 'post',
     headers: new Headers({
         'Content-Type': 'application/json'
     }),
     body: JSON.stringify(post)
 });
 console.log("works");
 if (!resp.ok) {
     throwError(resp);
 }
};
// TODO: Write a function that deletes a post from the database using a fetch
const deletePost = async (postId) => {

  const resp = await fetch(APIURL + '/' + postId, {
      method: 'delete',
    });
    if(!resp.ok){
      throwError(resp);
    }

}

export {
    getPosts,
    addPost,
    deletePost
};
