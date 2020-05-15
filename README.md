# Loose (Client)

## Development notes:

Typescript won't allow you to call `createContext` without an argument, even though it doesn't need or use one when it's first called. So if you see `createContext({})`, that's why!