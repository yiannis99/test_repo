import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta
					httpEquiv='Content-Security-Policy'
					content="connect-src 'self' https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://www.googleapis.com;"
				/>
			</Head>
			<body className='antialiased'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
