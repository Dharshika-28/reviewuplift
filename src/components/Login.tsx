import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
// import { signInWithGoogle } from "../firebase/firebase"; // adjust path as needed

export default function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <Card className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
        <CardContent>
          <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
            Create an Account
          </h2>

          <Button
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-2 border-orange-500 text-orange-600 hover:bg-orange-100"
            // onClick={signInWithGoogle}
          >
            <FcGoogle size={20} /> Continue with Google
          </Button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <Button
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-2 border-black-500 text-black-600 hover:bg-orange-200"
            // onClick={signInWithGoogle}
          >
            Continue with another account
          </Button>

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account? <a href="/register" className="text-orange-600 font-medium">Register here?</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
