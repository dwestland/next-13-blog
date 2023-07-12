import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/common/prisma'

const {
  SECRET = '',
  GITHUB_ID = '',
  GITHUB_SECRET = '',
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  EMAIL_SERVER_HOST = '',
  EMAIL_SERVER_PORT = '',
  EMAIL_SERVER_USER = '',
  EMAIL_SERVER_PASSWORD = '',
  EMAIL_FROM = '',
} = process.env

// Ensure environment variables are present, or throw an error
if (!GITHUB_ID) throw new Error('Missing GITHUB_ID environment variable')
if (!GITHUB_SECRET)
  throw new Error('Missing GITHUB_SECRET environment variable')
if (!SECRET) throw new Error('Missing SECRET environment variable')

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: EMAIL_SERVER_HOST,
        port: EMAIL_SERVER_PORT,
        auth: {
          user: EMAIL_SERVER_USER,
          pass: EMAIL_SERVER_PASSWORD,
        },
      },
      from: EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      ;(session as any).userId = user.id

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
