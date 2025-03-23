import type { Metadata } from "next"

interface MetadataConfig {
  title: string
  description: string
  url: string
  imageUrl: string
}

const baseConfig: MetadataConfig = {
  title: "AI Cards - Explore Your Relationship with AI",
  description:
    "Engage in deep conversations about AI with our thought-provoking question cards. Perfect for self-reflection and group discussions.",
  url: "https://www.aicards.fr",
  imageUrl: "https://www.aicards.fr/images/og-image.jpg",
}

const frConfig: MetadataConfig = {
  title: "AI Cards - Explorez Votre Relation avec l'IA",
  description:
    "Engagez des conversations profondes sur l'IA avec nos cartes de questions stimulantes. Parfait pour l'auto-réflexion et les discussions de groupe.",
  url: "https://www.aicards.fr",
  imageUrl: "https://www.aicards.fr/images/og-image.jpg",
}

export function generateMetadata({ lang = "en" }: { lang?: string } = {}): Metadata {
  const config = lang === "fr" ? frConfig : baseConfig

  return {
    title: config.title,
    description: config.description,
    metadataBase: new URL(config.url),
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url,
      siteName: config.title,
      images: [
        {
          url: config.imageUrl,
          width: 1200,
          height: 630,
          alt: "AI Cards Game Preview",
        },
      ],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.imageUrl],
    },
    alternates: {
      languages: {
        en: `${config.url}/en`,
        fr: `${config.url}/fr`,
      },
    },
  }
}

