import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { findUserByEmail, user, users } from "../../user";
import { json, redirect } from "@remix-run/node";
import { useEffect } from "react";

type ActionData = {
  user?: user;
  error?: string;
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validation
  if (!name || !email || !password) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = findUserByEmail(email, password);
  if (existingUser) {
    return json({ error: 'User already exists' }, { status: 400 });
  }

  // Create new user
  const newUser = {
    id: Math.random(),
    name,
    email,
    password
  };

  users.push(newUser);
  return json({ user: newUser }, { status: 200 });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      navigate(`/profile/${user.id}`);
      return;
    }

    // Handle new user registration
    if (actionData?.user) {
      localStorage.setItem('user', JSON.stringify(actionData.user));
      navigate(`/profile/${actionData.user.id}`);
    }
  }, [actionData, navigate]);

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Form method="post" className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          {actionData?.error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {actionData.error}
              </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
                name="name"
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
                name="email"
                type="email"
                id="email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
                name="password"
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
            />
          </div>

          <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
          >
            Sign Up
          </button>
        </Form>
      </div>
  );
}