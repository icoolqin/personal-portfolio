import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Portfolio',
  description: 'A personal portfolio website',
};

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const lang = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
                window.location.replace('/' + lang);
              })();
            `,
          }}
        />
      </head>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p style={{ color: '#666' }}>Loading...</p>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}