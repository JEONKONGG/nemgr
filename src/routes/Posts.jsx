import { Outlet } from 'react-router-dom';

import PostsList from '../components/PostsList';

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  // list 호출
  // const response = await fetch('http://localhost:8080/posts');
  // const resData = await response.json();
  // return resData.posts;
  return {"author":"d", "body":"hey"};
}
