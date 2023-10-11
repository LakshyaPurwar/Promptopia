"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from '@components/Profile';

const MyProfile = () => {
    const {data : session} = useSession();
    const [posts , setPosts] = useState([]);
    const router = useRouter();

    const handleEdit = async (post)=>{
        router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete = async  (post)=>{
        const hasConfirmed = confirm("Do you want to delete this prompt ?");
        if(hasConfirmed)
        {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method : 'DELETE'
                });

                const filteredPosts = posts.filter((singlePost)=>{
                    return singlePost._id!=post._id
                });
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect( () => {
        const fetchPosts = async () => {
            console.log(session?.user.id)
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            console.log("Printing the personalized posts received here")
            console.log(data)
            setPosts(data);
        }

        fetchPosts();
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile