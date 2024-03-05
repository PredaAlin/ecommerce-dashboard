import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'

const adminEmails = ['apreda253@gmail.com']

export const authOptions = {
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),

  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks:{
    session: ({session, token, user}) => {
      if (adminEmails.includes(session?.user?.email) ){
         return session;
      }else{
      return false;
       
      
    }
    }
  }
} 


const handler =  NextAuth(authOptions)

export {handler as GET, handler as POST}