

import {findUserById, user} from "../../user";
import {json, redirect, useLoaderData} from "@remix-run/react";

export const loader = async ({ params } :{params : {id : string }}) => {
   const user =  findUserById(Number(params.id))
   if (!user) {
      return redirect("/")
   }

    return (user);
};

export default function profile ()  {
 const user = useLoaderData<user>()
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h1>
                <p className="text-gray-700 mb-4">{user.email}</p>
            </div>
        </div>
    )
}
