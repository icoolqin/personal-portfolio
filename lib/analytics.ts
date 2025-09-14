// 定义事件参数类型
type EventParameters = Record<string, string | number | boolean | null | undefined>;

// 声明全局类型
declare global {
  interface Window {
    zaraz?: {
      track: (eventName: string, parameters: EventParameters) => void;
    };
    gtag?: (
      command: 'event',
      eventName: string,
      parameters: EventParameters
    ) => void;
  }
}

export const trackEvent = (eventName: string, parameters: EventParameters) => {
  // Cloudflare Web Analytics
  if (window.zaraz) {
    window.zaraz.track(eventName, parameters);
  }

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// 使用UTM参数追踪来源
export const getTrafficSource = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source'),     // 如: wechat-app-1
    medium: params.get('utm_medium'),     // 如: app-link
    campaign: params.get('utm_campaign'), // 如: cross-promotion
  };
};