/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  useRecoilTransactionObserver_UNSTABLE,
  RecoilRoot,
  useRecoilCallback,
  RecoilState,
  MutableSnapshot,
} from 'recoil'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Subject, asyncScheduler } from 'rxjs'
import { throttleTime } from 'rxjs/operators'

const PersistedStatesContext = createContext<RecoilState<any>[]>([])

const usePersistance = () => {
  const statesToPersist = useContext(PersistedStatesContext)
  const subject = useRef(new Subject<{ [key: string]: any }>())

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const newState = {}

    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      // only persist the wanted state
      if (!statesToPersist.find((state) => state.key === modifiedAtom.key)) return

      const atomLoadable = snapshot.getLoadable(modifiedAtom)
      if (atomLoadable.state === 'hasValue') {
        newState[modifiedAtom.key] = { value: atomLoadable.contents }
      }
    }

    subject.current.next(newState)
  })

  useEffect(() => {
    const listener$ = subject.current
      .pipe(throttleTime(500, asyncScheduler, { trailing: true }))
      .subscribe(async (newState) => {
        try {
          const prevValue = await AsyncStorage.getItem('localStorage')
          AsyncStorage.setItem(
            'localStorage',
            JSON.stringify({
              ...(prevValue ? JSON.parse(prevValue) : {}),
              ...newState,
            }),
          )
        } catch (e) {
          console.error(e)
        }
      })

    return () => listener$.unsubscribe()
  }, [])
}

export function useResetStore(): () => Promise<void> {
  const statesToReset = useContext(PersistedStatesContext)

  return useRecoilCallback(({ reset }) => async () => {
    statesToReset.forEach((key) => {
      reset(key)
    })
    // force delete right away
    await AsyncStorage.setItem('localStorage', JSON.stringify({}))
  })
}

function RecoilPersistor() {
  usePersistance()
  return null
}

type PersistedRecoilRootState = {
  states?: RecoilState<any>[]
  children: React.ReactNode
}

export function PersistedRecoilRoot({
  children,
  states = [],
}: PersistedRecoilRootState): JSX.Element {
  const [initialeState, setInitialState] = useState<
    { [key: string]: { value: any } } | undefined
  >(undefined)

  useEffect(() => {
    async function restore() {
      const restored = await AsyncStorage.getItem('localStorage')
      setInitialState(restored ? JSON.parse(restored) : {})
    }
    restore()
  }, [])

  function initializeState({ set }: MutableSnapshot) {
    if (initialeState) {
      Object.keys(initialeState || {}).forEach((key) => {
        const stateToRestore = states.find((state) => state.key === key)
        if (stateToRestore) {
          set(stateToRestore, initialeState[key].value)
        }
      })
    }
  }

  return (
    <PersistedStatesContext.Provider value={states}>
      {initialeState ? (
        <RecoilRoot initializeState={initializeState}>
          <RecoilPersistor />
          {children}
        </RecoilRoot>
      ) : null}
    </PersistedStatesContext.Provider>
  )
}
