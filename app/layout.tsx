import './globals.scss'

type RootLayoutProps = { children: React.ReactNode }

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
