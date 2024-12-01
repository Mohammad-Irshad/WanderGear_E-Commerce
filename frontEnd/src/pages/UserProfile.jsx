import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const {userProfile} = useSelector((state) => state.products)

  return (
    <div>
      <Header/>
      <main className='container'>
        <section className='py-4'>
            <div className='card'>
                <div className='card-header'>
                    <h3>User Detalis</h3>
                </div>
                <div className='card-body'>
                    <p> <strong>Name: </strong> {userProfile.name}</p>
                    <p> <strong>Phone No: </strong> {userProfile.phoneNo}</p>
                    <p> <strong>Email: </strong> {userProfile.email}</p>
                    {userProfile.addresses.map((add, ind) => (
                        <p key={add.id}> <strong>Address: </strong> {ind+1}. {' '}
                            {add.addresslineOne} {add.addresslineTwo}, {add.city}, {add.state}, {add.zip}
                        </p>
                    ))}
                    <button className='btn btn-sm btn-success'>Edit User Details</button>                    
                </div>
            </div>
        </section>
      </main>
    </div>
  )
}

export default UserProfile
