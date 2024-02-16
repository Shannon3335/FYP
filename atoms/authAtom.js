import { atom } from 'jotai'

const authAtom = atom(null)

const setAuthAtom = atom(null, (get, set, update) => {
  set(authAtom, update)
})

const readAtom = atom((get) => {
  get(authAtom)
})
