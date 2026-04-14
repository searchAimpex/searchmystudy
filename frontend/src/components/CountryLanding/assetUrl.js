const BACKEND_ORIGIN = 'https://backend.searchmystudy.com';

export function getAssetUrl(path) {
  if (!path || typeof path !== 'string') return '';
  const trimmed = path.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('blob:')) return trimmed;
  const base = trimmed.replace(/^\/+/, '');
  return `${BACKEND_ORIGIN}/${base}`;
}
