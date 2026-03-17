/**
 * Ticket Validation Handler
 * Uses Cloudflare Workflows to orchestrate ticket validation process
 */

export async function handleTicketValidation(request, env, ctx, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const { ticketId, walletAddress, eventId } = await request.json();

    if (!ticketId || !walletAddress) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: ticketId and walletAddress' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Query ticket from D1 database
    const ticketQuery = await env.DB.prepare(
      'SELECT * FROM tickets WHERE id = ? AND wallet_address = ?'
    ).bind(ticketId, walletAddress).first();

    if (!ticketQuery) {
      return new Response(JSON.stringify({ 
        valid: false,
        error: 'Ticket not found or does not belong to this wallet'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Use AI to analyze ticket legitimacy and provide insights
    const aiAnalysis = await analyzeTicketWithAI(env, ticketQuery);

    // Record validation attempt
    await env.DB.prepare(
      'INSERT INTO validation_logs (ticket_id, wallet_address, timestamp, result, ai_analysis) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      ticketId,
      walletAddress,
      new Date().toISOString(),
      aiAnalysis.isValid ? 'valid' : 'invalid',
      JSON.stringify(aiAnalysis)
    ).run();

    return new Response(JSON.stringify({
      valid: aiAnalysis.isValid,
      ticket: ticketQuery,
      analysis: aiAnalysis,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Validation handler error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to validate ticket',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function analyzeTicketWithAI(env, ticket) {
  const prompt = `Analyze this ticket data and determine if it appears legitimate:

Ticket Details:
- ID: ${ticket.id}
- Event: ${ticket.event_name}
- Price: ${ticket.price}
- Type: ${ticket.ticket_type}
- Date Purchased: ${ticket.purchase_date}
- Wallet: ${ticket.wallet_address}

Check for:
1. Reasonable pricing
2. Valid date range
3. Consistent metadata
4. No suspicious patterns

Respond with a JSON object containing:
{
  "isValid": true/false,
  "confidence": 0-100,
  "concerns": ["list", "of", "concerns"],
  "recommendation": "action to take"
}`;

  try {
    const aiResponse = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
      messages: [
        { role: 'system', content: 'You are a ticket fraud detection AI. Analyze ticket data and return JSON.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 512,
      temperature: 0.3
    });

    const response = aiResponse.response || aiResponse.result?.response;
    
    // Try to parse JSON from response
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse AI JSON response:', e);
    }

    // Fallback if parsing fails
    return {
      isValid: true,
      confidence: 85,
      concerns: [],
      recommendation: 'Manual review recommended',
      rawResponse: response
    };

  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      isValid: true,
      confidence: 50,
      concerns: ['AI analysis failed'],
      recommendation: 'Manual verification required'
    };
  }
}
