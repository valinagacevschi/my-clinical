import { IMessage } from 'react-native-gifted-chat'

const messages: IMessage[] = [
  {
    _id: 130,
    createdAt: new Date(),
    text: 'here',
    video: 'https://media.giphy.com/media/3o6ZthZjk09Xx4ktZ6/giphy.mp4',
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: 9,
    text: '#awesome 3',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 8,
    text: '#awesome 2',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 7,
    text: '#awesome',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 6,
    text: 'Paris',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    image: 'https://femto.scrolller.com/fallout-by-3-zeta-d2hzlitwow-1080x1497.jpg',
    sent: true,
    received: true,
  },
  {
    _id: 5,
    text: 'Send me a picture!',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 3,
    text: 'Where are you?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 2,
    text: 'Yes, and I use #GiftedChat!',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
    },
    sent: true,
    received: true,
  },
  {
    _id: 1,
    text: 'Are you building a chat app?',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'Vali Naga',
    },
  },
  {
    _id: 10,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio)',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: [
        {
          title: '😋 Yes',
          value: 'yes',
        },
        {
          title: '😐 Somehow',
          value: 'yes_picture',
        },
        {
          title: '😞 No',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: 20,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(),
    quickReplies: {
      type: 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Yes',
          value: 'yes',
        },
        {
          title: 'Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: 'Nope. What?',
          value: 'no',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: 30,
    createdAt: new Date(),
    text: 'here',
    video: 'https://media.giphy.com/media/3o6ZthZjk09Xx4ktZ6/giphy.mp4',
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
]
export default messages
