import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper'

import { Routes } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import { NativeStackParamList } from '../../routes'
import api from '../../services/api'

type CreateContactNavigationProp =
  NativeStackNavigationProp<NativeStackParamList>

export function CreateContact() {
  const { goBack, navigate } = useNavigation<CreateContactNavigationProp>()

  const { userToken } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')

  const buttonDisabled =
    firstName.length < 1 ||
    lastName.length < 1 ||
    phone.length < 1 ||
    birthdate.length < 1 ||
    address.length < 1 ||
    email.length < 1

  const [dialogVisible, setDialogVisible] = useState(false)

  async function handleSubmit() {
    try {
      const data = {
        firstName,
        lastName,
        phone,
        birthdate,
        address,
        email,
      }

      await api.post('/contacts', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      setDialogVisible(true)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title="Cadastrar contato" />
      </Appbar.Header>

      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          label="Nome"
          mode="outlined"
          value={firstName}
          onChangeText={(value) => setFirstName(value)}
        />
        <TextInput
          style={styles.textInput}
          label="Sobrenome"
          mode="outlined"
          value={lastName}
          onChangeText={(value) => setLastName(value)}
        />
        <TextInput
          style={styles.textInput}
          label="Telefone"
          mode="outlined"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
        <TextInput
          style={styles.textInput}
          label="Data de Nascimento"
          mode="outlined"
          keyboardType="numeric"
          value={birthdate}
          onChangeText={(value) => setBirthdate(value)}
        />
        <TextInput
          style={styles.textInput}
          label="Endereço"
          mode="outlined"
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
        <TextInput
          style={styles.textInput}
          label="E-mail"
          mode="outlined"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Button
          style={styles.primaryButton}
          mode="contained"
          onPress={() => handleSubmit()}
          disabled={buttonDisabled}
        >
          Cadastrar
        </Button>
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Content>
              <Text variant="bodyLarge">Contato cadastrado com sucesso!</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => navigate(Routes.HOME)}>
                Ir para lista de contatos
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
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
