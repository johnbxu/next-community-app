import React from 'react'

const UserPosts = ({props}) => {
  return (
    <div>
      
    </div>
  )
}

export default UserPosts

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/posts?user=`);

  return {
    props: {
    },
  };
};
