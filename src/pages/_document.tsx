import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
  return (
    <Html lang="pt">
      <Head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta name='description' content='Desenvolvido por Marcos Bezerra' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body className="bg-[url('../../public/backgroud.png')] bg-contain bg-center">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
          crossOrigin="anonymous"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}