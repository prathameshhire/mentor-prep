import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import './index.css'
import { HeaderMegaMenu } from "../components/HeaderMegaMenu/HeaderMegaMenu";
import '@mantine/carousel/styles.css';
import { FooterSocial } from "../components/FooterSocial/FooterSocial";

export const metadata = {
  title: "Mentor Prep",
  description: "Find all your Career and Personal Development Solutions here",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <HeaderMegaMenu />
          {children}
          <FooterSocial/>
          </MantineProvider>
      </body>
    </html>
  );
}
