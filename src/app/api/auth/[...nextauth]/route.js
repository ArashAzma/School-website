import connect from "@/utils/db"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from '@/models/users';
import bcrypt from "bcryptjs"


export const authOptions ={
  providers: [
    CredentialsProvider({
    id:"credentials",
    name:"Credentials",
      async authorize(credentials) {
        await connect();
        try{
            const user = await User.findOne({email: credentials.email});
            if(user){
                const isPass = await bcrypt.compare(credentials.password, user.password);
                if(isPass){
                    return user;
                }
                else{
                    throw new Error("Wrong password");
                }
            }else{
                throw new Error("User not found");
            }
        }catch(err){
            throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}