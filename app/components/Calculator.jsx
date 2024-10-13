'use client';
import React, { useState } from 'react';
import { VscSettings } from "react-icons/vsc";
import { useClerk, useAuth } from '@clerk/clerk-react';

export default function Calculator() {
  const [monthlyCost, setMonthlyCost] = useState();
  const [customerAcquisitionCost, setCustomerAcquisitionCost] = useState();
  
  const [result, setResult] = useState({
    basic: 0,
    pro: 0,
    premium: 0,
  });

  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  const calculatePricing = () => {
    if (!isSignedIn) {
      openSignIn(); 
      return; 
    }

    const totalCost = monthlyCost + customerAcquisitionCost;

    const basicPlan = Math.ceil(totalCost + totalCost * 0.30); // 30% profit
    const proPlan = Math.ceil(totalCost + totalCost * 0.60); // 60% profit
    const premiumPlan = Math.ceil(totalCost + totalCost * 0.90); // 90% profit

    setResult({
      basic: basicPlan,
      pro: proPlan,
      premium: premiumPlan,
    });
  };

  const handleInputClick = () => {
    if (!isSignedIn) {
      openSignIn(); 
    }
  };

  return (
    <div className='text-lg mx-4 md:mx-16 lg:mx-32 my-10 border rounded-md border-col'>
      <div className='mx-6 mt-6 tracking-wide'>
        <div>
          <h1 className='font-semibold text-xl'>Your SaaS Pricing Calculator</h1>
          <p className='font-thin text-sm'>Find the perfect price for your SaaS product.</p>
        </div>

        {/* Calculator section */}
        <div className='flex flex-col xl:flex-row lg:space-x-7 xl:space-x-32 space-y-10 lg:space-y-0 pt-10'>

          {/* Parameters section */}
          <div className='flex flex-col pt-3 space-y-6 mb-6'>
            <p className='flex items-center space-x-1 text-2xl font-semibold'>
              <VscSettings />
              <span>Parameters</span>
            </p>

            {/* Monthly Cost */}
            <div className='space-y-2'>
              <p className='text-xl'>Monthly cost <span className='text-sm'>(per user)</span>:</p>
              <input
                type="number"
                placeholder='$'
                className='bg-background border border-col rounded px-4 py-2'
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(Number(e.target.value))}
                onClick={handleInputClick} // Show sign-in modal on click
              />
              <p className='text-xs max-w-full xl:w-[500px] opacity-60'>
                *Include all the costs needed to run your SaaS, such as storage, hosting fees, software licenses, and other operational expenses.
              </p>
            </div>

            {/* Customer Acquisition Cost */}
            <div className='space-y-2'>
              <p className='text-xl'>Customer acquisition cost <span className='text-sm'>(per user)</span>:</p>
              <input
                type="number"
                placeholder='$'
                className='bg-background border border-col rounded px-4 py-2'
                value={customerAcquisitionCost}
                onChange={(e) => setCustomerAcquisitionCost(Number(e.target.value))}
                onClick={handleInputClick} // Show sign-in modal on click
              />
              <p className='text-xs max-w-full xl:w-[500px] opacity-60'>
                *The cost to acquire each customer (marketing, sales expenses...).
              </p>
            </div>

            <div>
              <button
                className='bg-col text-background text-lg font-bold px-20 py-2 rounded w-full xl:w-auto'
                onClick={calculatePricing} // Show sign-in modal if not signed in
              >
                Calculate
              </button>
            </div>
          </div>

          {/* Vertical Separator */}
          <div className="hidden lg:block w-[1px] h-auto bg-col"></div>

          {/* Result section */}
          <div className='mt-4 space-y-4 '>
            <h2 className='text-2xl font-semibold'>Pricing Result</h2>

            <div className='bg-bred text-center py-3 rounded-lg w-full xl:w-72 '>
              <p className='text-2xl font-bold'>Basic plan</p>
              <p className='text-3xl mt-1'>{result.basic}$</p>
            </div>

            <div className='bg-bred text-center py-3 rounded-lg w-full xl:w-72'>
              <p className='text-2xl font-bold'>Pro plan</p>
              <p className='text-3xl mt-1'>{result.pro}$</p>
            </div>

            <div className='bg-bred text-center py-3 rounded-lg w-full xl:w-72'>
              <p className='text-2xl font-bold'>Premium plan</p>
              <p className='text-3xl mt-1'>{result.premium}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
