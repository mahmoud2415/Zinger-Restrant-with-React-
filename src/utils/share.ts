/**
 * Robust cross-browser sharing and clipboard copy utility
 * Works reliably even on non-HTTPS local development IPs (like 192.168.x.x)
 */

export function copyToClipboardFallback(text: string): boolean {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback to legacy execCommand
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

export async function shareContent(options: {
  title: string;
  text: string;
  url: string;
}): Promise<'native' | 'whatsapp' | 'copied'> {
  const fullText = `${options.text}\n${options.url}`;

  // 1. Try Native Mobile Share Sheet if available
  if (navigator.share) {
    try {
      await navigator.share({
        title: options.title,
        text: options.text,
        url: options.url,
      });
      return 'native';
    } catch (error: unknown) {
      // If user cancelled, don't fallback to copy
      if (error instanceof Error && error.name === 'AbortError') {
        return 'native';
      }
    }
  }

  // 2. Fallback: Copy to clipboard
  copyToClipboardFallback(fullText);
  return 'copied';
}
