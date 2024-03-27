import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Portal, Snackbar, TextInput } from 'react-native-paper'

import { Routes } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import { NativeStackParamList } from '../../routes'
import api from '../../services/api'
import { AuthResponse } from '../../types'

type SignInNavigationProp = NativeStackNavigationProp<NativeStackParamList>

export function SignIn() {
  const { navigate } = useNavigation<SignInNavigationProp>()

  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const buttonDisabled = email.length < 1 || password.length < 1

  const [snackbarErrorVisible, setSnackbarErrorVisible] = useState(false)

  async function handleSubmit() {
    try {
      const data = {
        email,
        password,
      }

      const response = await api.post<AuthResponse>('/sessions', data)

      const token = response.data.access_token

      signIn(token)

      navigate(Routes.HOME)
    } catch (error) {
      setSnackbarErrorVisible(true)
      console.log({ error })
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        label="E-mail"
        value={email}
        onChangeText={(value) => setEmail(value)}
        mode="outlined"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        label="Senha"
        value={password}
        onChangeText={(value) => setPassword(value)}
        mode="outlined"
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <Button
        style={styles.primaryButton}
        mode="contained"
        onPress={() => handleSubmit()}
        disabled={buttonDisabled}
      >
        Entrar
      </Button>
      <Button
        style={styles.secondaryButton}
        onPress={() => navigate(Routes.SIGN_UP)}
      >
        Criar conta
      </Button>
      <Portal>
        <Snackbar
          visible={snackbarErrorVisible}
          onDismiss={() => setSnackbarErrorVisible(false)}
          duration={3000}
        >
          Credenciais inválidas.
        </Snackbar>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  textInput: {
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 8,
  },
  secondaryButton: {
    marginTop: 4,
  },
})
