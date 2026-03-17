/**
 * Voice Input Handler
 * Processes voice input using Whisper AI model
 */

export async function handleVoiceInput(request, env, ctx, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    });
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    
    let audioData;
    let userId;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      audioData = await formData.get('audio');
      userId = formData.get('userId');
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      // Expecting base64 encoded audio
      audioData = body.audio;
      userId = body.userId;
    } else {
      return new Response(JSON.stringify({ 
        error: 'Invalid content type. Expected multipart/form-data or application/json' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!audioData || !userId) {
      return new Response(JSON.stringify({ 
        error: 'Missing audio data or userId' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Convert audio to text using Whisper
    let audioBuffer;
    if (typeof audioData === 'string') {
      // Base64 encoded
      audioBuffer = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
    } else {
      // File object
      audioBuffer = await audioData.arrayBuffer();
    }

    const transcription = await env.AI.run('@cf/openai/whisper', {
      audio: [...new Uint8Array(audioBuffer)]
    });

    const transcribedText = transcription.text || transcription.result?.text;

    if (!transcribedText) {
      return new Response(JSON.stringify({ 
        error: 'Failed to transcribe audio' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Process the transcribed text through the chat handler
    const chatRequest = new Request(request.url.replace('/voice', '/chat'), {
      method: 'POST',
      body: JSON.stringify({
        message: transcribedText,
        userId: userId,
        context: { inputType: 'voice' }
      }),
      headers: request.headers
    });

    // Import and use the chat handler
    const { handleChatRequest } = await import('./chatHandler.js');
    const chatResponse = await handleChatRequest(chatRequest, env, ctx, corsHeaders);
    const chatData = await chatResponse.json();

    // Optionally: Convert response to speech using TTS
    // const ttsAudio = await env.AI.run('@cf/meta/tts', {
    //   text: chatData.response
    // });

    return new Response(JSON.stringify({
      transcription: transcribedText,
      response: chatData.response,
      sessionId: chatData.sessionId,
      timestamp: new Date().toISOString(),
      inputType: 'voice'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Voice handler error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process voice input',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
