import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://neuralscript.tech/',
      lastMod: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add other pages if they exist
  ]
}