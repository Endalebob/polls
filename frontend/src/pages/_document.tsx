import { useAppDispatch } from '<@>/app/hooks'
import { getUser } from '<@>/features/userSlice'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
