import { Output, streamText, tool, type UIMessageStreamWriter } from "ai";
import { z } from "zod";
import type { ChatMessage } from "@/lib/types"; // keep if types exist
import { generateUUID } from "@/lib/utils"; // optional, or stub

type Suggestion = {
  id: string;
  originalText: string;
  suggestedText: string;
  description: string | null;
  documentId: string;
  isResolved: boolean;
  userId: string;
  createdAt: Date;
  documentCreatedAt: Date;
};


type RequestSuggestionsProps = {
  dataStream: UIMessageStreamWriter<ChatMessage>;
};

// Stub for getDocumentById
async function getDocumentById({ id }: { id: string }) {
  return {
    id,
    title: "Demo Document",
    kind: "text",
    content: "This is a demo document content to generate suggestions from.",
  };
}

export const requestSuggestions = ({
  dataStream,
}: RequestSuggestionsProps) =>
  tool({
    description:
      "Request writing suggestions for an existing document artifact. Only use this when the user explicitly asks to improve or get suggestions for a document they have already created.",
    inputSchema: z.object({
      documentId: z.string().describe("The UUID of an existing document artifact"),
    }),
    execute: async ({ documentId }) => {
      const document = await getDocumentById({ id: documentId });

      if (!document || !document.content) {
        return {
          error: "Document not found",
        };
      }

      const suggestions: Omit<Suggestion, "userId" | "createdAt">[] = [];

      const { partialOutputStream } = streamText({
        model: "gpt-4", // replace with getArtifactModel() if available
        system:
          "You are a help writing assistant. Given a piece of writing, please offer suggestions to improve the piece of writing. Max 5 suggestions.",
        prompt: document.content,
        output: Output.array({
          element: z.object({
            originalSentence: z.string(),
            suggestedSentence: z.string(),
            description: z.string(),
          }),
        }),
      });

      let processedCount = 0;
      for await (const partialOutput of partialOutputStream) {
        if (!partialOutput) continue;

        for (let i = processedCount; i < partialOutput.length; i++) {
          const element = partialOutput[i];
          if (!element?.originalSentence || !element?.suggestedSentence || !element?.description) continue;
           
          const now = new Date();

const suggestion: Suggestion = {
  originalText: element.originalSentence,
  suggestedText: element.suggestedSentence,
  description: element.description || null,
  id: generateUUID ? generateUUID() : `suggestion-${i}`,
  documentId,
  isResolved: false,
  userId: "ui-stub-user", // fake user ID for UI
  createdAt: now,
  documentCreatedAt: now, // or pull from document if available
};


          dataStream.write({
            type: "data-suggestion",
            data: suggestion,
            transient: true,
          });

          suggestions.push(suggestion);
          processedCount++;
        }
      }

      return {
        id: documentId,
        title: document.title,
        kind: document.kind,
        message: "Suggestions have been added to the document",
      };
    },
  });
