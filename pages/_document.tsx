import Document, { Head, Html, Main, NextScript } from "next/document";
import { JSX } from "react";

class CustomDocument extends Document {
  render(): JSX.Element {
    console.log("Running Once");
    return (
      <Html lang="ko">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap"
            rel="stylesheet"
          />
          {/* google폰트를 이용하면 원래 유저는 저 링크로 가서 css파일을 다운로드 받고 css를 적용해야 하는데,
           nextjs덕분에 미리 서버상에서 다운로드 받고 npm run build하면 모든 html에 이 css를 코드로 뿌려줌.
           따라서 유저가 브라우저상에서 다운받을 필요가 없어서 최적화가 됨.
         */}
        </Head>
        <body>
          {/* Main에서 _app이 동작함. */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
