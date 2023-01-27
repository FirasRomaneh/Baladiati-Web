import { useState } from "react";
import { createContext } from "react";

import Cookies from "js-cookie";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const initialToken = Cookies.get('token')

  const [token, setToken] = useState(initialToken)

  const handleSetToken = t => {

    if (t) {
      setToken(t)
      Cookies.set('token', t, { expires: 1 })
    } else {
      setToken(null)
      Cookies.remove('token')
    }
  }


  const login = async (body) => {
    console.log(JSON.stringify(body))
    const res = await fetch('https://important-foal-buckle.cyclic.app/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    const data = await res.json()
    if (res.ok) {
      handleSetToken(data.token)
    } else {
      handleSetToken(null)
      throw Error(data.message)
    }
  }


  const checkLogin = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('https://important-foal-buckle.cyclic.app/checkAccess', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        }
      })


      if (!res.ok) {
        handleSetToken(null)
      }
    } catch (error) {
      handleSetToken(null)
    }
  }, [token])

  const isMount = useRef(false)

  useEffect(() => {
    if (!isMount.current) {
      checkLogin()
      isMount.current = true
    }
  }, [checkLogin])


  const logout = () => {
    handleSetToken(null)
  }

  return <AuthContext.Provider value={{ isAuth: !!token, login, logout }}>
    {children}
  </AuthContext.Provider>
}