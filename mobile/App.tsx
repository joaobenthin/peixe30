import { StatusBar } from 'react-native'
import { PaperProvider } from 'react-native-paper'

import { AuthProvider } from './src/context/AuthContext'
import { AppRoutes } from './src/routes'

export function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AppRoutes />
      </AuthProvider>
    </PaperProvider>
  )
}
