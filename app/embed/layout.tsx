

import { DataStreamProvider } from "@/components/data-stream-provider";

export const metadata = {
  title: "Chatbot Embed",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body style={{ margin: 0, background: "transparent" }}>
        <DataStreamProvider>
          {children}
        </DataStreamProvider>
      </body>
    </html>
  );
}
