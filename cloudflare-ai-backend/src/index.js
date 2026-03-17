/**
 * Authieticket AI-Powered Backend
 * Built on Cloudflare Workers with Workers AI (Llama 3.3)
 */

import { TicketAssistant } from './durableObjects/TicketAssistant';
import { handleChatRequest } from './handlers/chatHandler';
import { handleTicketValidation } from './handlers/validationHandler';
import { handleVoiceInput } from './handlers/voiceHandler';

export { TicketAssistant };

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route to appropriate handler
      switch (url.pathname) {
        case '/api/chat':
          return await handleChatRequest(request, env, ctx, corsHeaders);
        
        case '/api/validate-ticket':
          return await handleTicketValidation(request, env, ctx, corsHeaders);
        
        case '/api/voice':
          return await handleVoiceInput(request, env, ctx, corsHeaders);
        
        case '/api/health':
          return new Response(JSON.stringify({ 
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {
              ai: 'operational',
              durableObjects: 'operational',
              workflows: 'operational'
            }
          }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        
        default:
          return new Response(JSON.stringify({ 
            error: 'Not found',
            availableEndpoints: [
              '/api/chat',
              '/api/validate-ticket',
              '/api/voice',
              '/api/health'
            ]
          }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
      }
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  },
};
