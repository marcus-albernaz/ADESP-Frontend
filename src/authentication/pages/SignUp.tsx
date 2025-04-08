'use client';

import Header from '@/core/components/Header';
import Footer from '@/core/components/Footer';
import SignUpForm from '@/authentication/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#2B1E49]">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <SignUpForm/>
        </div>
      </div>

      <Footer />
    </div>
  );
}
