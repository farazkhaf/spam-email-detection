import './globals.css'

export const metadata = {
  title: 'Spam Email Detector',
  description: 'A simple tool to check if an email is spam or not',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}