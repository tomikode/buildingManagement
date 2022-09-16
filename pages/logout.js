import React, { useEffect } from 'react'
import Layout from '../components/Layout'

const logout = () => {

    useEffect(() => {
        sessionStorage.removeItem('user')
    }, [])

  return (
    <Layout logout={true}>
        You have been logged out
    </Layout>
  )
}

export default logout