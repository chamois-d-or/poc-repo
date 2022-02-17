import Document, { Html, Head, Main, NextScript } from 'next/document'
import { repoName } from '../prismicConfiguration' // import from wherever this is set

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument