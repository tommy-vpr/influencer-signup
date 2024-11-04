import InfluencerLogin from '@/components/my-components/InfluencerLoginForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='w-[400px]'>
      <InfluencerLogin />
      <div className="text-sm mt-4">
        <Link href="/dashboard" className="underline underline-offset-4 cursor-pointer">Admin login</Link>
        {/* &nbsp;or&nbsp; */}
        <span className='text-gray-500'> | </span>
        <Link href="/dashboard" className="underline underline-offset-4 cursor-pointer">Influencer login</Link>
        
        </div>
      </div>
    </div>
  )
}

export default page
