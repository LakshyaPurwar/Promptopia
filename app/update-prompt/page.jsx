'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react"

import Form from "@components/Form";

const EditPrompt = () => {

    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({});
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log("Id from search params", id)

    useEffect(() => {
        const getPrompt = async () => {
            try {
                const response = await fetch(`/api/prompt/${id}`);
                
                if (response.ok) {
                    const prompt = await response.json();
                    setPost(prompt);
                }

            } catch (error) {
                console.log(error)
            }
        }
        if (id) {
            getPrompt();
        }
    }, [id])



    const editPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        if(!id)
        {
            return alert('Prompt Id not found!');
        }
        try {
            const response = await fetch(`api/prompt/${id}`,{
                method : 'PATCH',
                body: JSON.stringify({
                    prompt : post.prompt,
                    tag : post.tag,
                })
            })

            if(response.ok){
                router.push('/profile');
            }

        }
        catch (e) {
            console.log(e);
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={editPrompt}
        />
    )
}

export default EditPrompt