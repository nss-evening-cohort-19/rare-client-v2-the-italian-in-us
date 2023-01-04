/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PostList from '../../components/Post/PostList';
import ProfileCard from '../../components/profileCard';
import { useAuth } from '../../utils/context/authContext';
import getSingleUser from '../../utils/data/userData';

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getUserDetails = () => {
    getSingleUser(id, user.uid).then(setUserProfile);
  };

  useEffect(() => {
    getUserDetails();
  }, [userProfile.subbed, router.query]);

  return (
    <>
      <div className="userProfileContainer">
        <ProfileCard userProfile={userProfile} user={user} onUpdate={getUserDetails} className="profileCard" />
      </div>
      <div className="user-posts-div">
        {userProfile.posts?.map((post) => (
          <PostList key={post.id} author={userProfile} postObj={post} onUpdate={getUserDetails} />
        ))}

      </div>
    </>
  );
}
