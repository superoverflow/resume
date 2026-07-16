import './globals.css';

export const metadata = {
  title: 'Cyrus Tang - CV',
  description: 'CV for Cyrus Tang generated from Markdown',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
