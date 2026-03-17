/**
 * TicketAssistant Durable Object
 * Manages state and conversation history for each user session
 */

export class TicketAssistant {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);
    
    switch (url.pathname) {
      case '/conversation':
        return this.handleConversation(request);
      
      case '/history':
        return this.getConversationHistory();
      
      case '/clear':
        return this.clearConversation();
      
      case '/preferences':
        return this.handlePreferences(request);
      
      default:
        return new Response('Not found', { status: 404 });
    }
  }

  async handleConversation(request) {
    const { message, userId, context } = await request.json();
    
    // Get existing conversation history
    const history = await this.state.storage.get('conversation_history') || [];
    
    // Add user message to history
    history.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
      context: context
    });

    // Get user preferences
    const preferences = await this.state.storage.get('user_preferences') || {};
    
    // Store conversation state
    await this.state.storage.put('conversation_history', history);
    await this.state.storage.put('last_activity', Date.now());

    return new Response(JSON.stringify({
      success: true,
      history: history,
      preferences: preferences,
      sessionId: this.state.id.toString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async getConversationHistory() {
    const history = await this.state.storage.get('conversation_history') || [];
    const preferences = await this.state.storage.get('user_preferences') || {};
    
    return new Response(JSON.stringify({
      history: history,
      preferences: preferences,
      messageCount: history.length
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async clearConversation() {
    await this.state.storage.delete('conversation_history');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Conversation history cleared'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async handlePreferences(request) {
    if (request.method === 'POST') {
      const preferences = await request.json();
      await this.state.storage.put('user_preferences', preferences);
      
      return new Response(JSON.stringify({
        success: true,
        preferences: preferences
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const preferences = await this.state.storage.get('user_preferences') || {};
      
      return new Response(JSON.stringify({
        preferences: preferences
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  async addAssistantResponse(response) {
    const history = await this.state.storage.get('conversation_history') || [];
    
    history.push({
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    });

    await this.state.storage.put('conversation_history', history);
  }
}
