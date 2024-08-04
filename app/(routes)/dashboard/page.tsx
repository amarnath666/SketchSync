"use client";

import { KindeState } from '@/app/type';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import React, { useEffect } from 'react';
import FileList from './_components/FileList';
import Header from './_components/Header';

const Dashboard = () => {
  const convex = useConvex();
  const { user }: KindeState = useKindeBrowserClient();

  // Correctly type the createUser mutation arguments
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    if (user && user.email) {
      const result = await convex.query(api.user.getUser, { email: user.email });
      if (!result?.length) {
        createUser({
          name: user.given_name || '',
          email: user.email,
          image: user.picture || ''
        }).then((resp) => {
          console.log(resp);
        });
      }
    }
  };

  return (
    <div className='p-8'>
      <Header />
      <FileList />
    </div>
  );
}

export default Dashboard;
