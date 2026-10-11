import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Plus, Code, Image as ImageIcon, X } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { cn } from '../../utils/cn';
import { Message, Attachment } from '../../types';

const COMMON_EMOJIS = ['😀', '😂', '😍', '🚀', '🔥', '💜', '🎉', '💯', '👍', '🙌', '✨', '💡', '⚡', '👏', '🥳', '😎'];

interface MessageInputProps {
  replyingTo?: Message | null;
  onCancelReply?: () => void;
}

export default function MessageInput({ replyingTo, onCancelReply }: MessageInputProps) {
  const { activeChannel, sendMessage } = useCommunity();
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('typescript');
  const [codeFilename, setCodeFilename] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Focus textarea when active channel changes or reply set
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeChannel.id, replyingTo]);

  // Close emoji picker on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
        setShowAttachMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed && attachments.length === 0) return;

    sendMessage(activeChannel.id, trimmed, attachments.length > 0 ? attachments : undefined);
    setContent('');
    setAttachments([]);
    setShowEmojiPicker(false);
    setShowAttachMenu(false);
    onCancelReply?.();

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  const addEmoji = (emoji: string) => {
    setContent(prev => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleAttachCode = () => {
    if (!codeSnippet.trim()) return;
    setAttachments(prev => [
      ...prev,
      {
        type: 'code',
        codeSnippet: codeSnippet.trim(),
        language: codeLanguage.trim() || 'code',
        filename: codeFilename.trim() || 'snippet.ts',
      },
    ]);
    setCodeSnippet('');
    setCodeFilename('');
    setCodeModalOpen(false);
  };

  const handleAttachSampleImage = () => {
    setAttachments(prev => [
      ...prev,
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80',
        filename: 'inspiration-preview.png',
      },
    ]);
    setShowAttachMenu(false);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="px-4 pb-4 pt-1 bg-canvas-primary select-none">
      {/* ── Replying to banner ── */}
      {replyingTo && (
        <div className="flex items-center justify-between px-3 py-1.5 mb-1 bg-canvas-card rounded-t-lg text-xs text-slate-300 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-slate-400">Replying to</span>
            <span className="font-semibold text-indigo-300">
              @{replyingTo.sender.displayName}
            </span>
            <span className="text-slate-500 truncate max-w-xs italic">
              "{replyingTo.content}"
            </span>
          </div>
          <button
            onClick={onCancelReply}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded"
            title="Cancel reply"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Pending attachments pill preview ── */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-canvas-card/80 rounded-lg border border-slate-700/60">
          {attachments.map((att, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-2.5 py-1 rounded bg-canvas-darkest border border-slate-700 text-xs text-slate-200"
            >
              {att.type === 'code' ? (
                <Code className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span className="truncate max-w-[140px]">
                {att.filename || (att.type === 'code' ? 'Code Snippet' : 'Image')}
              </span>
              <button
                onClick={() => removeAttachment(i)}
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Input box ── */}
      <div
        ref={emojiPickerRef}
        className={cn(
          'relative flex items-end gap-2 bg-canvas-card rounded-lg px-3 py-2',
          'border border-slate-700/60 focus-within:border-brand/70 shadow-sm transition-colors',
          replyingTo && 'rounded-t-none',
        )}
      >
        {/* Attachment menu trigger */}
        <div className="relative mb-0.5">
          <button
            type="button"
            onClick={() => setShowAttachMenu(v => !v)}
            aria-label="Add attachment"
            title="Attach file or snippet"
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Attachment options dropdown */}
          {showAttachMenu && (
            <div className="absolute left-0 bottom-full mb-2 w-48 bg-canvas-darkest border border-slate-700 rounded-lg shadow-xl p-1 z-30">
              <button
                onClick={() => {
                  setShowAttachMenu(false);
                  setCodeModalOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-canvas-card rounded transition-colors text-left"
              >
                <Code className="w-4 h-4 text-indigo-400" />
                <span>Attach Code Snippet</span>
              </button>
              <button
                onClick={handleAttachSampleImage}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-canvas-card rounded transition-colors text-left"
              >
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Attach Sample Image</span>
              </button>
            </div>
          )}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${activeChannel.name}`}
          rows={1}
          className="flex-1 bg-transparent text-[15px] text-slate-100 placeholder-slate-500
                     outline-none resize-none max-h-44 py-1 leading-relaxed"
          style={{ minHeight: '24px' }}
        />

        {/* Right action buttons: Emoji picker & Send */}
        <div className="flex items-center gap-1.5 mb-0.5 shrink-0">
          {/* Emoji popover trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(v => !v)}
              aria-label="Insert emoji"
              title="Emoji picker"
              className="w-8 h-8 flex items-center justify-center rounded text-slate-400 hover:text-amber-300 hover:bg-slate-700 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Emoji popover */}
            {showEmojiPicker && (
              <div className="absolute right-0 bottom-full mb-2 w-64 bg-canvas-darkest border border-slate-700 rounded-xl shadow-2xl p-3 z-30">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Frequently Used
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {COMMON_EMOJIS.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="w-8 h-8 flex items-center justify-center rounded hover:bg-canvas-card text-lg transition-transform hover:scale-125"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!content.trim() && attachments.length === 0}
            aria-label="Send message"
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
              content.trim() || attachments.length > 0
                ? 'bg-brand text-white hover:bg-brand-hover shadow-md cursor-pointer'
                : 'text-slate-500 cursor-not-allowed opacity-50',
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Helper hint */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
        <span>Press <kbd className="px-1 py-0.5 bg-canvas-card rounded text-slate-400">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-canvas-card rounded text-slate-400">Shift + Enter</kbd> for new line</span>
      </div>

      {/* ── Code Snippet Modal ── */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-canvas-darkest border border-slate-700 rounded-xl shadow-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-400" />
                Attach Code Snippet
              </h3>
              <button
                onClick={() => setCodeModalOpen(false)}
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Filename
                  </label>
                  <input
                    type="text"
                    value={codeFilename}
                    onChange={e => setCodeFilename(e.target.value)}
                    placeholder="example.tsx"
                    className="w-full px-3 py-1.5 rounded-lg bg-canvas-card border border-slate-700 text-xs text-slate-200 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Language
                  </label>
                  <select
                    value={codeLanguage}
                    onChange={e => setCodeLanguage(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-canvas-card border border-slate-700 text-xs text-slate-200 outline-none focus:border-brand"
                  >
                    <option value="typescript">TypeScript</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Code Snippet
                </label>
                <textarea
                  value={codeSnippet}
                  onChange={e => setCodeSnippet(e.target.value)}
                  placeholder="// Paste or write your code here..."
                  rows={6}
                  className="w-full px-3 py-2 rounded-lg bg-canvas-card border border-slate-700 text-xs font-mono text-slate-200 outline-none focus:border-brand resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCodeModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-100 hover:bg-canvas-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAttachCode}
                disabled={!codeSnippet.trim()}
                className="px-4 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand-hover disabled:opacity-50 transition-colors"
              >
                Add Snippet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
