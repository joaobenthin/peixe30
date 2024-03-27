import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Routes } from '../constants/routes'
import { CreateContact } from '../screens/CreateContact'
import { Home } from '../screens/Home'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'

export type NativeStackParamList = {
  HOME: undefined
  SIGN_IN: undefined
  SIGN_UP: undefined
  CREATE_CONTACT: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<NativeStackParamList>()

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.SIGN_IN}
      >
        <Screen name={Routes.SIGN_IN} component={SignIn} />
        <Screen name={Routes.SIGN_UP} component={SignUp} />
        <Screen name={Routes.HOME} component={Home} />
        <Screen name={Routes.CREATE_CONTACT} component={CreateContact} />
      </Navigator>
    </NavigationContainer>
  )
}
