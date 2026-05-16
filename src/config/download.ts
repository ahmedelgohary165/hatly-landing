import { site } from '@/config/site';

/** رابط تحميل التطبيق — Play Store أو فيسبوك مؤقتًا */
export function getAppDownloadUrl(): string {
  const play = site.playStoreUrl?.trim();
  if (play) return play;
  return site.facebookUrl;
}
