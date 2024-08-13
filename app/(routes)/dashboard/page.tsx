"use client";

import { KindeState } from '@/app/type';
import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useConvex, useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react';
import FileList from './_components/FileList';
import Header from "./_components/Header"
import { useActiveTeam } from '@/app/_context/ActiveTeamContext';

const Dashboard = () => {
  const convex = useConvex();
  const { user }: KindeState = useKindeBrowserClient();
  const { activeTeam } = useActiveTeam();
  const createUser = useMutation(api.user.createUser);
  const [searchQuery, setSearchQuery] = useState("");

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
        });
      }
    }
  };

  return (
    <div className='p-4 md:p-6 lg:p-8 w-full'>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
      <FileList searchQuery={searchQuery} />
    </div>
  );
}

export default Dashboard;