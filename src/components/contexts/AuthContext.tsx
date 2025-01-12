'use client'

import { User } from '@/types/User'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<LoginResponse>
  logout: () => void
}

interface LoginResponse {
  token: string
  account: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setToken(localStorage.getItem('token') || '');
    }
  }, [])

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    
    const response = (await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })).json()) as LoginResponse;

    localStorage.setItem('user', JSON.stringify(response.account));
    localStorage.setItem('token', response.token);

    setToken(response.token);
    setUser(response.account);

    return response;
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

