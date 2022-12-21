/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard';
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
  }, [userProfile.subbed]);

  return (
    <>
      <div className="userProfileContainer">
        <Image src={userProfile.profileImageUrl} alt="Profile Avatar" />
        <ProfileCard userProfile={userProfile} user={user} onUpdate={getUserDetails} className="profileCard" />

      </div>
    </>
  );
}
