
export const metadata = {
  title: 'Sign Up',
  description: 'Register for an account',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en">
        <body className="flex flex-col">
          {children}
          </body>
      </html>
    
  )
}