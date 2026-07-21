function requireValue(name: string, value: string | undefined): string {
  if (value === undefined || value === null) {
    throw new Error(`${name} is not defined`);
  }
  return value;
}

// @export
export const env = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  BASE_PATH: requireValue('NEXT_PUBLIC_BASE_PATH', process.env.NEXT_PUBLIC_BASE_PATH),
} as const;
