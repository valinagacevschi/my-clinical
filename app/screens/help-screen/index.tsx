import React, { useEffect, useState } from 'react'
import AssetUtils from 'expo-asset-utils'
import * as FileSystem from 'expo-file-system'
import { WebView } from 'react-native-webview'
import { SafeView, Loader } from '../../components/shared'
import { Colors } from '../../themes'

export default function HelpScreen(): JSX.Element {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const loadContent = async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const file = await AssetUtils.resolveAsync(require('../../fixtures/help.html'))
      const content = await FileSystem.readAsStringAsync(file.localUri)
      setHtml(content)
    }
    loadContent()
  }, [])

  return (
    <SafeView wide>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        startInLoadingState={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        renderLoading={() => <Loader size='large' color={Colors.snow} />}
        style={{
          backgroundColor: Colors.clear,
        }}
      />
    </SafeView>
  )
}
