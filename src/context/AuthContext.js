import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const initialToken = Cookies.get('token')
  const initialUid = Cookies.get('uid')
  const initiaAdmin = Cookies.get('admin')
  const [token, setToken] = useState(initialToken)
  const [uid, setUid] = useState(initialUid)
  const [admin, setAdmin] = useState(initiaAdmin)
  const location = useLocation()

  const handleSetToken = (t, n, d) => {

    if (t) {
      setToken(t)
      setUid(n)
      setAdmin(d)
      Cookies.set('token', t, { expires: 1 })
      Cookies.set('uid', n, { expires: 1 })
      Cookies.set('admin', d, { expires: 1 })
    } else {
      setAdmin(null)
      setToken(null)
      setUid(null)
      Cookies.remove('token')
      Cookies.remove('uid')
      Cookies.remove('admin')
    }
  }


  const login = async (body) => {
    const res = await fetch('https://important-foal-buckle.cyclic.app/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    const data = await res.json()
    if (res.ok) {
      handleSetToken(data.token, data.uid, data.administrator)
    } else {
      handleSetToken(null, null, null)
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
        handleSetToken(null, null, null)
      } else {
        const data = await res.json()
        if(data !== admin){
          setAdmin(data)
          Cookies.set('admin', data, { expires: 1 })
        }
      }
    } catch (error) {
      handleSetToken(null, null, null)
    }
  }, [admin, token])

  const isMount = useRef(false)

  useEffect(() => {
    if (isMount.current) {
      checkLogin();
    } else {
      isMount.current = true;
    }
  }, [checkLogin, location]);

  const logout = () => {
    handleSetToken(null, null, null)
  }

  return <AuthContext.Provider value={{ isAuth: !!token, login, logout, uid: uid , isAdmin: admin}}>
    {children}
  </AuthContext.Provider>
}