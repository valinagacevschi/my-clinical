import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import * as Sentry from 'sentry-expo'
import { SafeView } from '../../components/shared'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import { renderMessageVideo } from './video-audio'
import {
  renderBubble,
  renderSend,
  ScrollToBottomComponent,
  renderInputToolbar,
  renderComposer,
} from './assets'
import { t } from '../../locales'
import { firstTreatment, messagesState } from '../../recoil/profile/selectors'
import { API } from '../../services/api'

const user = { _id: 1, name: 'Anonymous' }

export default function MessagesScreen(): JSX.Element {
  const { id: treatment_id } = useRecoilValue(firstTreatment)
  const initialMessages = useRecoilValue(messagesState)

  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      setMessages(GiftedChat.append(messages, messages))
      const text = messages.map((m) => m.text).toString()
      await messageReply({ treatment_id, text, sender: 1 })
    },
    [messages],
  )

  console.log('rendering MessagesScreen')
  return (
    <SafeView wide style={styles.safeView}>
      <GiftedChat
        loadEarlier={false}
        messages={messages}
        onSend={onSend}
        user={user}
        placeholder={t('MSG.placeholder')}
        keyboardShouldPersistTaps='never'
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={renderScrollToBottom}
        renderMessageVideo={renderMessageVideo}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        quickReplyStyle={styles.quickReply}
        timeTextStyle={styles.timeText}
        isTyping={true}
        isLoadingEarlier
        infiniteScroll
        messagesContainerStyle={styles.messagesContainer}
      />
    </SafeView>
  )
}

function renderScrollToBottom() {
  return <ScrollToBottomComponent />
}

const styles = {
  safeView: { flex: 1, backgroundColor: '#f9f9f955' },
  timeText: { left: { color: 'green' }, right: { color: 'red' } },
  quickReply: { borderRadius: 5 },
  messagesContainer: { paddingBottom: 24 },
}

async function messageReply(message) {
  const response = await API.messageReply({ message })
  if (!response.ok) {
    Sentry.Native.captureEvent({
      sagas: 'messageReply',
      ...response,
    })
  }
  return response.ok
}
