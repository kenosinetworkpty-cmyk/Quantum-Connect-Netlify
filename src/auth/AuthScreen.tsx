import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('User already exists. Please sign in');
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setError('Email or password is incorrect');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          {isSignUp ? 'Create an Account' : 'Client Zone Sign In'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 relative'>
            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input
              type='email'
              placeholder='Email Address'
              className='w-full pl-10 pr-4 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6 relative'>
            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
            <input
              type='password'
              placeholder={isSignUp ? 'Create Password' : 'Password'}
              className='w-full pl-10 pr-4 py-2 border rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            type='submit'
            className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300'
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <p className='text-center text-sm text-gray-600 mt-4'>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <a href='#' className='text-blue-600 hover:underline' onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
