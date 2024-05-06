import Document, { Head, Main, Html, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        {/* <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head> */}
        <Head />
        <body>
          <div id="my-overlay"></div>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
