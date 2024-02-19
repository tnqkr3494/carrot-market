import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            fetch(url).then((response) => response.json()),
        }}
      >
        <div className="mx-auto w-full max-w-xl">
          <Component {...pageProps} />
          <div id="global-modal"></div>
        </div>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="lazyOnload"
        />
        {/* strategy : 스크립트 불러오는 타이밍 설정 */}
        {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId: "your-app-id",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v13.0",
            });
          };
        }}
      /> */}
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
