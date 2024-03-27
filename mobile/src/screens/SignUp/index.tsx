import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper'

import { Routes } from '../../constants/routes'
import { NativeStackParamList } from '../../routes'
import api from '../../services/api'

type SignUpNavigationProp = NativeStackNavigationProp<NativeStackParamList>

export function SignUp() {
  const { navigate } = useNavigation<SignUpNavigationProp>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const buttonDisabled =
    name.length < 1 || email.length < 1 || password.length < 1

  const [dialogVisible, setDialogVisible] = useState(false)

  async function handleSubmit() {
    try {
      const data = {
        name,
        email,
        password,
      }

      await api.post('/accounts', data)

      setDialogVisible(true)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: 16,
          justifyContent: 'center',
        }}
      >
        <TextInput
          style={styles.textInput}
          label="Nome"
          value={name}
          onChangeText={(value) => setName(value)}
          mode="outlined"
          placeholder="Digite seu nome"
        />
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
          Cadastrar
        </Button>
        <Button
          style={styles.secondaryButton}
          onPress={() => navigate(Routes.SIGN_IN)}
        >
          Voltar para Login
        </Button>
      </View>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Content>
            <Text variant="bodyLarge">Usuário cadastrado com sucesso!</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => navigate(Routes.SIGN_IN)}>
              Ir para login
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
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
