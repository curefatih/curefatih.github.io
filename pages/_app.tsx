import ThemeConfigurer from "@component/ThemeConfigurer/ThemeConfigurer";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <ThemeConfigurer />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
