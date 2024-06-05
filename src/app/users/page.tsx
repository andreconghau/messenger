'use client';
import { signOut } from 'next-auth/react';

const UserPage = () => {
  return (
    <div>
      User Page
      <div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default UserPage;
