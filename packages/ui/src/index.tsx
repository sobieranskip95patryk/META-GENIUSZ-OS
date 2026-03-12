'use client';

import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode, useState } from 'react';

// ============================================================
// BUTTON
// ============================================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:   'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    ghost:     'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline:   'border border-violet-600 text-violet-600 hover:bg-violet-50 focus:ring-violet-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

// ============================================================
// INPUT
// ============================================================

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

// ============================================================
// TEXTAREA
// ============================================================

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className = '', id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-vertical ${
          error ? 'border-red-400 focus:ring-red-400' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

// ============================================================
// SELECT
// ============================================================

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  error?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function Select({ label, error, options, value, onChange, placeholder, className = '', id }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value ?? ''}
        onChange={e => onChange?.(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
          error ? 'border-red-400' : 'border-gray-300'
        } ${className}`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ============================================================
// CARD
// ============================================================

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-8' };
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
}

// ============================================================
// BADGE
// ============================================================

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger:  'bg-red-100 text-red-700',
    info:    'bg-blue-100 text-blue-700',
    purple:  'bg-violet-100 text-violet-700',
  };
  const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-3 py-1 text-sm' };
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}

// ============================================================
// AVATAR
// ============================================================

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, name, size = 'md', className = '' }: AvatarProps) {
  const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-sm', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-base', xl: 'w-20 h-20 text-xl' };
  const initials = name ? name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?';

  return src ? (
    <img
      src={src}
      alt={name ?? 'avatar'}
      className={`rounded-full object-cover ${sizes[size]} ${className}`}
    />
  ) : (
    <div className={`rounded-full bg-violet-500 text-white flex items-center justify-center font-semibold ${sizes[size]} ${className}`}>
      {initials}
    </div>
  );
}

// ============================================================
// LOADING SPINNER
// ============================================================

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-9 h-9' };
  return (
    <div className={`${sizes[size]} border-2 border-violet-500 border-t-transparent rounded-full animate-spin`} />
  );
}

// ============================================================
// MODAL
// ============================================================

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, maxWidth = 'md' }: ModalProps) {
  if (!open) return null;
  const widths = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-label="Close modal" />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${widths[maxWidth]} p-6`}>
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ============================================================
// TABS
// ============================================================

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
            active === tab.id
              ? 'border-violet-600 text-violet-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${active === tab.id ? 'bg-violet-100' : 'bg-gray-100'}`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// POST CARD
// ============================================================

export interface PostCardProps {
  id: string;
  content: string;
  imageUrl?: string;
  author: { id: string; name?: string; username?: string; image?: string };
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: Date | string;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onReport?: (id: string) => void;
}

export function PostCard({
  id, content, imageUrl, author, likesCount, commentsCount,
  isLiked = false, createdAt, onLike, onComment, onReport,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);

  const handleLike = () => {
    setLiked(l => !l);
    setCount(c => liked ? c - 1 : c + 1);
    onLike?.(id);
  };

  const timeStr = typeof createdAt === 'string' ? createdAt : createdAt.toLocaleDateString('pl-PL');

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar src={author.image} name={author.name ?? author.username ?? '?'} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm text-gray-900">{author.name ?? author.username}</span>
            {author.username && <span className="text-xs text-gray-400">@{author.username}</span>}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{timeStr}</p>
        </div>
      </div>

      <p className="mt-3 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="mt-3 w-full max-h-80 object-cover rounded-lg"
          loading="lazy"
        />
      )}

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 hover:text-orange-500 transition-colors ${liked ? 'text-orange-500' : ''}`}
        >
          <span className="text-base">{liked ? '🔥' : '🩶'}</span>
          <span>{count}</span>
        </button>
        <button onClick={() => onComment?.(id)} className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
          <span className="text-base">💬</span>
          <span>{commentsCount}</span>
        </button>
        {onReport && (
          <button onClick={() => onReport(id)} className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors">
            Zgłoś
          </button>
        )}
      </div>
    </Card>
  );
}

// ============================================================
// USER CARD
// ============================================================

export interface UserCardProps {
  id: string;
  name?: string;
  username?: string;
  image?: string;
  bio?: string;
  followersCount?: number;
  isFollowing?: boolean;
  onFollow?: (id: string) => void;
  className?: string;
}

export function UserCard({ id, name, username, image, bio, followersCount, isFollowing = false, onFollow, className = '' }: UserCardProps) {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = () => {
    setFollowing(f => !f);
    onFollow?.(id);
  };

  return (
    <Card className={`flex items-center gap-4 ${className}`}>
      <Avatar src={image} name={name ?? username} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">{name ?? username}</p>
        {username && name && <p className="text-sm text-gray-400">@{username}</p>}
        {bio && <p className="text-sm text-gray-600 mt-1 truncate">{bio}</p>}
        {followersCount !== undefined && (
          <p className="text-xs text-gray-400 mt-0.5">{followersCount} obserwujących</p>
        )}
      </div>
      {onFollow && (
        <Button variant={following ? 'secondary' : 'primary'} size="sm" onClick={handleFollow}>
          {following ? 'Obserwujesz' : 'Obserwuj'}
        </Button>
      )}
    </Card>
  );
}

// ============================================================
// COMMENT ITEM
// ============================================================

export interface CommentItemProps {
  id: string;
  content: string;
  author: { name?: string; username?: string; image?: string };
  createdAt: Date | string;
}

export function CommentItem({ content, author, createdAt }: CommentItemProps) {
  const timeStr = typeof createdAt === 'string' ? createdAt : createdAt.toLocaleDateString('pl-PL');
  return (
    <div className="flex gap-3">
      <Avatar src={author.image} name={author.name ?? author.username} size="sm" />
      <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
        <span className="text-sm font-semibold text-gray-800">{author.name ?? author.username}</span>
        <span className="ml-2 text-xs text-gray-400">{timeStr}</span>
        <p className="text-sm text-gray-700 mt-0.5">{content}</p>
      </div>
    </div>
  );
}

// ============================================================
// NOTIFICATION ITEM
// ============================================================

export interface NotificationItemProps {
  id: string;
  type: string;
  title: string;
  body?: string;
  read: boolean;
  createdAt: Date | string;
  onRead?: (id: string) => void;
}

const NOTIFICATION_ICONS: Record<string, string> = {
  LIKE: '🔥',
  COMMENT: '💬',
  FOLLOW: '👤',
  TIP: '💸',
  SYSTEM: 'ℹ️',
  CHALLENGE_WON: '🏆',
};

export function NotificationItem({ id, type, title, body, read, createdAt, onRead }: NotificationItemProps) {
  const timeStr = typeof createdAt === 'string' ? createdAt : createdAt.toLocaleDateString('pl-PL');
  return (
    <button
      className={`w-full text-left flex gap-3 p-3 rounded-lg transition-colors ${read ? 'bg-white' : 'bg-violet-50 hover:bg-violet-100'}`}
      onClick={() => !read && onRead?.(id)}
    >
      <span className="text-2xl">{NOTIFICATION_ICONS[type] ?? '🔔'}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>{title}</p>
        {body && <p className="text-xs text-gray-500 truncate mt-0.5">{body}</p>}
        <p className="text-xs text-gray-400 mt-1">{timeStr}</p>
      </div>
      {!read && <div className="w-2 h-2 rounded-full bg-violet-600 mt-1.5 shrink-0" />}
    </button>
  );
}

// ============================================================
// FILE UPLOAD
// ============================================================

export interface FileUploadProps {
  onFile: (file: File) => void;
  accept?: string;
  label?: string;
  hint?: string;
  className?: string;
}

export function FileUpload({ onFile, accept = 'image/*', label = 'Dodaj plik', hint, className = '' }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onFile(file);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-colors">
        {preview ? (
          <img src={preview} alt="preview" className="h-full w-full object-contain rounded-xl" />
        ) : (
          <>
            <span className="text-3xl">📁</span>
            <span className="text-sm font-medium text-gray-600 mt-1">{label}</span>
            {hint && <span className="text-xs text-gray-400">{hint}</span>}
          </>
        )}
        <input type="file" accept={accept} className="sr-only" onChange={handleChange} />
      </label>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

export function EmptyState({ icon = '🔍', title, description, action }: {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-3">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-xs">{description}</p>}
      {action}
    </div>
  );
}

// ============================================================
// CREDIT DISPLAY
// ============================================================

export function CreditDisplay({ balance }: { balance: number }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${balance === 0 ? 'bg-red-100 text-red-600' : balance < 5 ? 'bg-yellow-100 text-yellow-700' : 'bg-violet-100 text-violet-700'}`}>
      ⚡ {balance} kredit{balance === 1 ? '' : balance < 5 ? 'y' : 'ów'}
    </span>
  );
}
