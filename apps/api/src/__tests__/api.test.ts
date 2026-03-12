import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  slugify,
  capitalize,
  truncate,
  sanitizeHtml,
  chunk,
  unique,
  formatDate,
  isExpired,
  timeAgo,
} from '@meta-geniusz/utils';

// ---------------------------------------------------------------------------
// validate() helper — replicated here so we can test it in isolation
// ---------------------------------------------------------------------------

function validate<S extends z.ZodTypeAny>(schema: S, data: unknown): { data: z.infer<S> } | { error: string } {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: result.error.errors.map((issue: z.ZodIssue) => `${issue.path.join('.')}: ${issue.message}`).join(', ') };
  }
  return { data: result.data };
}

// ---------------------------------------------------------------------------
// validate() tests
// ---------------------------------------------------------------------------

describe('validate()', () => {
  const schema = z.object({
    name: z.string().min(2).max(50),
    age:  z.number().int().positive(),
  });

  it('returns data on success', () => {
    const result = validate(schema, { name: 'Alice', age: 25 });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.name).toBe('Alice');
      expect(result.data.age).toBe(25);
    }
  });

  it('returns error when field is missing', () => {
    const result = validate(schema, { name: 'Bob' });
    expect('error' in result).toBe(true);
    if ('error' in result) expect(result.error).toContain('age');
  });

  it('returns error when value violates constraint', () => {
    const result = validate(schema, { name: 'X', age: 25 });
    expect('error' in result).toBe(true);
    if ('error' in result) expect(result.error).toContain('name');
  });

  it('returns error for negative age', () => {
    const result = validate(schema, { name: 'Alice', age: -1 });
    expect('error' in result).toBe(true);
  });

  it('handles completely wrong shape', () => {
    const result = validate(schema, null);
    expect('error' in result).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// validateEmail()
// ---------------------------------------------------------------------------

describe('validateEmail()', () => {
  it('passes valid email', () => expect(validateEmail('user@example.com')).toBe(true));
  it('passes email with subdomain', () => expect(validateEmail('x@a.b.co')).toBe(true));
  it('rejects missing @', () => expect(validateEmail('userexample.com')).toBe(false));
  it('rejects missing domain', () => expect(validateEmail('user@')).toBe(false));
  it('rejects empty string', () => expect(validateEmail('')).toBe(false));
});

// ---------------------------------------------------------------------------
// validatePassword()
// ---------------------------------------------------------------------------

describe('validatePassword()', () => {
  it('passes strong password', () => expect(validatePassword('Str0ngPass')).toBe(true));
  it('rejects too short', () => expect(validatePassword('Ab1')).toBe(false));
  it('rejects no uppercase', () => expect(validatePassword('weakpass1')).toBe(false));
  it('rejects no digit', () => expect(validatePassword('NoDigitPass')).toBe(false));
});

// ---------------------------------------------------------------------------
// validateUsername()
// ---------------------------------------------------------------------------

describe('validateUsername()', () => {
  it('passes valid username', () => expect(validateUsername('alice_99')).toBe(true));
  it('rejects too short', () => expect(validateUsername('ab')).toBe(false));
  it('rejects spaces', () => expect(validateUsername('alice bob')).toBe(false));
  it('rejects special chars', () => expect(validateUsername('alice!')).toBe(false));
});

// ---------------------------------------------------------------------------
// slugify()
// ---------------------------------------------------------------------------

describe('slugify()', () => {
  it('converts spaces to dashes', () => expect(slugify('Hello World')).toBe('hello-world'));
  it('lowercases', () => expect(slugify('UPPER')).toBe('upper'));
  it('strips leading/trailing dashes', () => expect(slugify('  leading  ')).toBe('leading'));
  it('strips special characters', () => expect(slugify('a@b#c')).toBe('abc'));
});

// ---------------------------------------------------------------------------
// capitalize()
// ---------------------------------------------------------------------------

describe('capitalize()', () => {
  it('uppercases first letter', () => expect(capitalize('hello')).toBe('Hello'));
  it('handles single char', () => expect(capitalize('x')).toBe('X'));
  it('handles empty string', () => expect(capitalize('')).toBe(''));
});

// ---------------------------------------------------------------------------
// truncate()
// ---------------------------------------------------------------------------

describe('truncate()', () => {
  it('leaves short strings unchanged', () => expect(truncate('hi', 10)).toBe('hi'));
  it('truncates long strings', () => {
    const result = truncate('Hello World', 8);
    expect(result.length).toBe(8);
    expect(result).toBe('Hello...');
  });
  it('uses custom suffix', () => expect(truncate('Hello World', 7, '~')).toBe('Hello W~'));
});

// ---------------------------------------------------------------------------
// sanitizeHtml()
// ---------------------------------------------------------------------------

describe('sanitizeHtml()', () => {
  it('escapes < and >', () => {
    const result = sanitizeHtml('<script>alert(1)</script>');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });
  it('escapes double quotes', () => {
    expect(sanitizeHtml('say "hi"')).toContain('&quot;');
  });
  it('escapes single quotes', () => {
    expect(sanitizeHtml("it's html")).toContain('&#x27;');
  });
  it('escapes ampersand', () => {
    expect(sanitizeHtml('a & b')).toContain('&amp;');
  });
});

// ---------------------------------------------------------------------------
// chunk()
// ---------------------------------------------------------------------------

describe('chunk()', () => {
  it('splits array into chunks', () => expect(chunk([1,2,3,4], 2)).toEqual([[1,2],[3,4]]));
  it('handles remainder', () => expect(chunk([1,2,3], 2)).toEqual([[1,2],[3]]));
  it('handles empty', () => expect(chunk([], 3)).toEqual([]));
});

// ---------------------------------------------------------------------------
// unique()
// ---------------------------------------------------------------------------

describe('unique()', () => {
  it('removes duplicates', () => expect(unique([1,2,2,3,3,3])).toEqual([1,2,3]));
  it('preserves order', () => expect(unique(['b','a','b'])).toEqual(['b','a']));
  it('handles empty', () => expect(unique([])).toEqual([]));
});

// ---------------------------------------------------------------------------
// formatDate()
// ---------------------------------------------------------------------------

describe('formatDate()', () => {
  const d = new Date('2026-03-12T10:00:00Z');
  it('returns YYYY-MM-DD by default', () => expect(formatDate(d)).toBe('2026-03-12'));
  it('supports custom format', () => expect(formatDate(d, 'DD/MM/YYYY')).toBe('12/03/2026'));
});

// ---------------------------------------------------------------------------
// isExpired()
// ---------------------------------------------------------------------------

describe('isExpired()', () => {
  it('returns true for past date', () => expect(isExpired(new Date('2000-01-01'))).toBe(true));
  it('returns false for future date', () => expect(isExpired(new Date('2099-01-01'))).toBe(false));
});

// ---------------------------------------------------------------------------
// timeAgo()
// ---------------------------------------------------------------------------

describe('timeAgo()', () => {
  it('returns seconds for very recent', () => {
    const t = new Date(Date.now() - 30_000);
    expect(timeAgo(t)).toMatch(/^\d+s$/);
  });
  it('returns minutes for ~10 minutes ago', () => {
    const t = new Date(Date.now() - 10 * 60_000);
    expect(timeAgo(t)).toMatch(/^\d+m$/);
  });
  it('returns hours for ~3 hours ago', () => {
    const t = new Date(Date.now() - 3 * 60 * 60_000);
    expect(timeAgo(t)).toMatch(/^\d+h$/);
  });
  it('returns days for ~2 days ago', () => {
    const t = new Date(Date.now() - 2 * 24 * 60 * 60_000);
    expect(timeAgo(t)).toMatch(/^\d+d$/);
  });
});
