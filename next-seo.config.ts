import { DefaultSeoProps } from 'next-seo'

const config: DefaultSeoProps = {
  titleTemplate: '%s | Thrive Light',
  defaultTitle: 'Thrive Light',
  description: 'Shine brighter online with accessible, fast, and modern web experiences by Thrive Light.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thrivelight.com',
    siteName: 'Thrive Light',
  },
  twitter: {
    handle: '@thrivelight',
    site: '@thrivelight',
    cardType: 'summary_large_image',
  },
}

export default config
