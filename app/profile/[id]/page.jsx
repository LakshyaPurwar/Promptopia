"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from '@components/profile';

const SomeProfile = ({ params }) => {
    // const {data : session} = useSession();
    const [posts , setPosts] = useState([]);

    const searchParams = useSearchParams();
    const username = searchParams.get('name');
    // const {
    //     query: { name },
    //   } = router

    useEffect( () => {
        const fetchPosts = async () => {
            
            console.log("The id is available to us : " , params.id)
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            console.log("Printing the personalized posts received here")
            console.log(data)
            setPosts(data);
        }

        params.id && fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={username}
            desc="Bhaag jaa yahaan se"
            data={posts}
        />
    )
}

export default SomeProfile