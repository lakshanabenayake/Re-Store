import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithErrorHandling } from './baseAPI';

export interface ConversationMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ChatMessageRequest {
  message: string;
  conversationHistory?: ConversationMessage[];
}

export interface ChatResponse {
  response: string;
  timestamp: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ChatResponse, ChatMessageRequest>({
      query: (request) => ({
        url: 'chat',
        method: 'POST',
        body: request,
      }),
    }),
    healthCheck: builder.query<{ status: string; service: string }, void>({
      query: () => 'chat/health',
    }),
  }),
});

export const { useSendMessageMutation, useHealthCheckQuery } = chatApi;
