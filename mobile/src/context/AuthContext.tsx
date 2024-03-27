import React, { createContext, ReactNode, useContext, useState } from 'react'

interface AuthContextType {
  userToken: string | null
  signIn: (token: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  signIn: async () => {},
  signOut: async () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null)

  const signIn = async (token: string) => {
    try {
      setUserToken(token)
    } catch (e) {
      console.error('Failed to save user token:', e)
    }
  }

  const signOut = async () => {
    try {
      setUserToken(null)
    } catch (e) {
      console.error('Failed to remove user token:', e)
    }
  }

  const authContextValue: AuthContextType = {
    userToken,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => useContext(AuthContext)
