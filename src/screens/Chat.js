import { useActionSheet } from '@expo/react-native-action-sheet'
import { Chat, MessageType, defaultTheme  } from '@flyerhq/react-native-chat-ui'
import { PreviewData } from '@flyerhq/react-native-link-preview'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { launchImageLibrary } from 'react-native-image-picker'
import { colors } from '../styles'

// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}

const App = () => {
  const { showActionSheetWithOptions } = useActionSheet()
  const [messages, setMessages] = useState([
    {
        "author": {
            "id": "06c33e8b-e835-4736-80f4-63f44b66666b"
        },
        "createdAt": 1646401682815,
        "id": "9e9f76ad-ad8d-497d-9f89-32a0aa04ec79",
        "text": "Good Afternoon sir! How can we help you",
        "type": "text"
    },
    {
        "author": {
            "id": "06c33e8b-e835-4736-80f4-63f44b66666c"
        },
        "createdAt": 1646401598600,
        "id": "c7c06e35-d2e8-482b-ae9b-011985f93ff2",
        "text": "this is test message",
        "type": "text"
    },
    {
        "author": {
            "id": "06c33e8b-e835-4736-80f4-63f44b66666c"
        },
        "createdAt": 1646401555817,
        "id": "d4adb64f-df4c-41c2-a5c8-0f33d158970f",
        "text": "hay",
        "type": "text"
    }
])
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  const addMessage = (message) => {
    setMessages([message, ...messages])
  }

  const handleAttachmentPress = () => {
    showActionSheetWithOptions(
      {
        options: ['Photo', 'File', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            handleImageSelection()
            break
          case 1:
            handleFileSelection()
            break
        }
      }
    )
  }

  const handleFilePress = async (message) => {
    try {
      await FileViewer.open(message.uri, { showOpenWithDialog: true })
    } catch {}
  }

  const handleFileSelection = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      })
      const fileMessage = {
        author: user,
        createdAt: Date.now(),
        id: uuidv4(),
        mimeType: response.type ?? undefined,
        name: response.name,
        size: response.size ?? 0,
        type: 'file',
        uri: response.uri,
      }
      addMessage(fileMessage)
    } catch {}
  }

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: 'photo',
        quality: 0.7,
      },
      ({ assets }) => {
        const response = assets?.[0]

        if (response?.base64) {
          const imageMessage = {
            author: user,
            createdAt: Date.now(),
            height: response.height,
            id: uuidv4(),
            name: response.fileName ?? response.uri?.split('/').pop() ?? '🖼',
            size: response.fileSize ?? 0,
            type: 'image',
            uri: `data:image/*;base64,${response.base64}`,
            width: response.width,
          }
          addMessage(imageMessage)
        }
      }
    )
  }

  const handlePreviewDataFetched = ({
    message,
    previewData,
  }) => {
    setMessages(
      messages.map<MessageType.Any>((m) =>
        m.id === message.id ? { ...m, previewData } : m
      )
    )
  }

  const handleSendPress = (message) => {
    const textMessage = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }

  console.log(messages)

  return (
    // Remove this provider if already registered elsewhere
    // or you have React Navigation set up
    <SafeAreaProvider>
      <Chat
        messages={messages}
        onAttachmentPress={handleAttachmentPress}
        onFilePress={handleFilePress}
        onPreviewDataFetched={handlePreviewDataFetched}
        onSendPress={handleSendPress}
        user={user}
        // theme={{
        //     ...defaultTheme,
        //     colors: { ...defaultTheme.colors, inputBackground: colors.PRIMARY},
        //   }}
      />
    </SafeAreaProvider>
  )
}

export default App