import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req , res)=>{
    const {userId , prompt , tag } = await req.json();
    try{
        await connectToDB();
        //We connect to db everytime because it is a lambda function
        //and it is going to die after every time it is triggered.
        //That is why these are called serverless api because they
        //Do not keep on running.
        const newPrompt = new Prompt({
            creator : userId,
            prompt,
            tag,
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt) , {status : 201 });
    }
    catch(error)
    {
        return new Response("Failed to create a new prompt" , {status : 500});
    }
}