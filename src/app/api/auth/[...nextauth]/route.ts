import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "instagram",
      name: "Instagram",
      type: "oauth",
      authorization: {
        url: "https://api.instagram.com/oauth/authorize",
        params: { scope: "user_profile,user_media" },
      },
      token: "https://api.instagram.com/oauth/access_token",
      userinfo: "https://graph.instagram.com/me?fields=id,username",
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.username,
          email: null,
          image: null,
        };
      },
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
});

export { handler as GET, handler as POST };
