/* eslint-disable @typescript-eslint/no-var-requires */
const Reactotron = require('reactotron-react-native').default

const errorPlugin = require('reactotron-react-native').trackGlobalErrors
const apisaucePlugin = require('reactotron-apisauce')

export const reactotron = Reactotron.configure({
  host: '192.168.1.19',
  name: 'MyDoc',
})
  .use(
    errorPlugin({
      veto: (frame) => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    }),
  )
  .use(apisaucePlugin())
  .connect()

Reactotron.clear()

const yeOldeConsoleLog = console.log

// make a new one
console.log = (...args) => {
  yeOldeConsoleLog(...args)
  if (args && args[0] && !args[0].startsWith('%c ')) {
    Reactotron.display({
      name: args[0],
      preview: args.length > 1 ? args[1] : args[0],
      value: args,
    })
  }
}

export default reactotron
