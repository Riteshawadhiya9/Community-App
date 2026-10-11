import { Message } from '../types';

const MESSAGES_KEY = 'community_messages';

export function loadMessages(): Record<string, Message[]> | null {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveMessages(messages: Record<string, Message[]>): void {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch (e) {
    console.warn('Failed to persist messages to localStorage:', e);
  }
}

export function clearMessages(): void {
  localStorage.removeItem(MESSAGES_KEY);
}
