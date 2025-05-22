
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RegisterForm } from '@/components/AuthForms';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="mb-8 text-center">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
          <div className="bg-primary rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2.038A2.968 2.968 0 0113 9a3 3 0 013-3 2.72 2.72 0 01.535.06l1.9-1.9A1 1 0 1019.5 3a1 1 0 00-.192 1.493l-1.9 1.9A2.72 2.72 0 0117 7a3 3 0 01-3 3H8V5a1 1 0 00-1-1H3z" />
            </svg>
          </div>
          <span className="font-bold text-xl">e KOSOVA</span>
        </Link>
        <h1 className="text-3xl font-bold mb-1">Create an Account</h1>
        <p className="text-gray-600">Join e KOSOVA for seamless public transport</p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
        
        <Link to="/">
          <Button variant="link" className="mt-4">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
