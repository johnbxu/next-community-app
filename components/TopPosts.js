import React from 'react';
import Link from 'next/link';
import moment from 'moment';

const TopPosts = ({ classPosts }) => {
  classPosts.map((classObj) => {
    classObj.posts = classObj.posts.slice(0, 5);
  });

  return (
    <>
      <div className="grid md:grid-cols-2 gap-2 mb-5 top-posts">
        {classPosts.map((classObj) => (
          <div
            className={`class-${classObj.title.toLowerCase()} border-gray-350 border-2 rounded`}
            key={classObj.title}
          >
            <h3 className="p-2">{classObj.title}</h3>
            {classObj.posts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${classObj.title.toLowerCase()}/${post.id}`}
              >
                <a>
                  <div className="py-3 border-t-2 p-2 hover:bg-gray-300 hover:bg-opacity-75 hover:text-black transition-colors post">
                    <div className="flex justify-between">
                      <div>{post.title}</div>
                      <div>&uarr; {post.votes}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>By: {post.author.username}</div>
                      <div>
                        Last Updated:{' '}
                        {moment(post.updated_at).startOf('day').fromNow()}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TopPosts;
