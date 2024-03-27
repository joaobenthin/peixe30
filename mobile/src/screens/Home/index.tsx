import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import {
  Appbar,
  Button,
  Dialog,
  FAB,
  List,
  Portal,
  Text,
} from 'react-native-paper'

import { Routes } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import { NativeStackParamList } from '../../routes'
import api from '../../services/api'
import { Contact, ContactResponse } from '../../types'
import { formatPhoneNumber } from '../../utils/format-phone'

type HomeNavigationProp = NativeStackNavigationProp<NativeStackParamList>

export function Home() {
  const { navigate } = useNavigation<HomeNavigationProp>()
  const isFocused = useIsFocused()

  const { userToken } = useAuth()

  const [contacts, setContacts] = useState<Contact[]>()
  const [loading, setLoading] = useState(true)

  const [dialogDeleteContactVisible, setDialogDeleteContactVisible] =
    useState(false)
  const [contactIdToDelete, setContactIdToDelete] = useState('')

  async function loadContacts() {
    try {
      setLoading(true)

      const response = await api.get<ContactResponse>('/contacts', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      setContacts(response.data.contacts)
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  async function handleModalDeleteContact(contactId: string) {
    setContactIdToDelete(contactId)
    setDialogDeleteContactVisible(true)
  }

  async function handleDeleteContact(contactId: string) {
    try {
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      loadContacts()
    } catch (error) {
      console.log({ error })
    } finally {
      setDialogDeleteContactVisible(false)
      setContactIdToDelete('')
    }
  }

  useEffect(() => {
    loadContacts()
  }, [isFocused])

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Contatos" />
        <Appbar.Action icon="logout" onPress={() => navigate(Routes.SIGN_IN)} />
      </Appbar.Header>
      <List.Section title="Meus contatos">
        <FlatList
          refreshing={loading}
          onRefresh={() => loadContacts()}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          data={contacts}
          renderItem={({ item }) => (
            <List.Accordion
              key={item.id}
              title={`${item.firstName} ${item.lastName}`}
              left={(props) => <List.Icon {...props} icon="account-circle" />}
            >
              <List.Item
                title={formatPhoneNumber(item.phone)}
                left={(props) => <List.Icon {...props} icon="phone" />}
              />
              <List.Item
                title={item.email}
                left={(props) => <List.Icon {...props} icon="email" />}
              />
              <List.Item
                title={item.birthdate}
                left={(props) => <List.Icon {...props} icon="cake" />}
              />
              <List.Item
                title={item.address}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
              />
              <Button
                mode="contained-tonal"
                onPress={() => handleModalDeleteContact(item.id)}
              >
                Deletar contato
              </Button>
            </List.Accordion>
          )}
        />
      </List.Section>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigate(Routes.CREATE_CONTACT)}
      />
      <Portal>
        <Dialog
          visible={dialogDeleteContactVisible}
          onDismiss={() => setDialogDeleteContactVisible(false)}
        >
          <Dialog.Content>
            <Text variant="bodyLarge">Deseja realmente apagar o contato?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogDeleteContactVisible(false)}>
              Cancelar
            </Button>
            <Button onPress={() => handleDeleteContact(contactIdToDelete)}>
              Apagar contato
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
