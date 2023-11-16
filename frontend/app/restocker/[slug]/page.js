import React from 'react'

const Page = ({ params }) => {
    return (
    <div>{params.slug}</div>
  )
}

export default Page