/**
 * Chat Handler - Processes chat requests using Workers AI (Llama 3.3)
 */

export async function handleChatRequest(request, env, ctx, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const { message, userId, sessionId, context } = await request.json();

    if (!message || !userId) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: message and userId' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get or create Durable Object for this user
    const durableObjectId = env.TICKET_ASSISTANT.idFromName(userId);
    const durableObject = env.TICKET_ASSISTANT.get(durableObjectId);

    // Store conversation in Durable Object
    const conversationResponse = await durableObject.fetch(
      new Request('https://fake-host/conversation', {
        method: 'POST',
        body: JSON.stringify({ message, userId, context })
      })
    );

    const conversationData = await conversationResponse.json();
    const conversationHistory = conversationData.history;

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(context);

    // Prepare messages for Llama 3.3
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Call Workers AI with Llama 3.3
    const aiResponse = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: messages,
      stream: false,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
    });

    const assistantResponse = aiResponse.response || 
                              aiResponse.result?.response || 
                              'Sorry, I encountered an error processing your request.';

    // Store assistant response in Durable Object
    await durableObject.fetch(
      new Request('https://fake-host/conversation', {
        method: 'POST',
        body: JSON.stringify({ 
          message: assistantResponse, 
          userId,
          context: { role: 'assistant' }
        })
      })
    );

    // Store in KV for analytics (optional)
    const conversationKey = `conversation:${userId}:${Date.now()}`;
    await env.CONVERSATIONS.put(conversationKey, JSON.stringify({
      userId,
      message,
      response: assistantResponse,
      timestamp: new Date().toISOString()
    }), {
      expirationTtl: 86400 * 30 // 30 days
    });

    return new Response(JSON.stringify({
      response: assistantResponse,
      sessionId: durableObjectId.toString(),
      timestamp: new Date().toISOString(),
      model: 'llama-3.3-70b'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat handler error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process chat request',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

function buildSystemPrompt(context) {
  return `You are an AI assistant for Authieticket, an innovative ticket marketplace that handles both NFT and traditional tickets. Your role is to help users with:

1. **Finding Events**: Help users discover concerts, sports events, conferences, and other events
2. **Ticket Information**: Explain ticket types (NFT vs Traditional), pricing, and availability
3. **NFT Tickets**: Explain blockchain-based tickets, wallet requirements, and benefits (authenticity, resale tracking, royalties)
4. **Buying Process**: Guide users through purchasing tickets, connecting wallets, and payment
5. **Selling Tickets**: Help sellers list tickets, set prices, and understand fees/royalties
6. **Ticket Verification**: Explain how ticket authenticity is verified on the blockchain
7. **Event Entry**: Guide users on how to use their tickets for venue entry (QR codes, wallet verification)
8. **Smart Contracts**: Explain how smart contracts ensure secure, transparent transactions

Key Features to Highlight:
- Anti-counterfeiting through blockchain verification
- Transparent resale with automatic royalties to event organizers
- Secure wallet-based ticket ownership
- Real-time ticket validation
- Fair pricing and fraud prevention

Be helpful, concise, and friendly. If asked about technical blockchain details, explain them in simple terms. Always prioritize user safety and legitimate ticket purchases.

${context ? `Current context: ${JSON.stringify(context)}` : ''}`;
}
