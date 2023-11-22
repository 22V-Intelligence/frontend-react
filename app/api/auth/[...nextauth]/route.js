import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import AppleProvider from 'next-auth/providers/apple';

export const authOptions = {
	NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OATH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OATH_CLIENT_SECRET,
		}),
		AppleProvider({
			clientId: process.env.APPLE_ID,
			clientSecret: process.env.APPLE_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'John@example.com',
				},
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;

				try {
					const signIn = await fetch(
						`${process.env.APP_URL}/api/auth/local`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								identifier: credentials.email,
								password: credentials.password,
							}),
						}
					);

					if (!signIn.ok) throw new Error(await signIn.text());

					return await signIn.json();
				} catch (error) {
					return null;
				}
			},
		}),
	],
	database: process.env.NEXT_PUBLIC_DATABASE_URL,
	session: {
		jwt: true,
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		signIn: async ({ user, account, profile }) => {
			return Promise.resolve(true);
		},
		session: async ({ session, token }) => {
			session.jwt = token.jwt;
			session.id = token.id;
			session.user = token.user;

			return Promise.resolve(session);
		},
		jwt: async ({ token, user, account }) => {
			const isSignIn = user ? true : false;
			if (isSignIn) {
				if (account.provider !== 'credentials') {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
					);
					const data = await response.json();
					token.jwt = data?.jwt || '';
					token.accessToken = account.access_token;
					token.id = data?.user?.id || '';
				} else {
					// token.jwt = user.jwt;
					token.accessToken = account.access_token;
					token.jwt = user?.jwt || '';
					token.id = user?.user?.id || '';
					token.user = user?.user || null;
				}
			}
			return Promise.resolve(token);
		},
	},
	pages: {
		signIn: '/sign-in',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
