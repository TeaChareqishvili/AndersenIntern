import { PasswordMaskPipe } from './password-mask.pipe';

describe('PasswordMaskPipe', () => {
  let pipe: PasswordMaskPipe;

  beforeEach(() => {
    pipe = new PasswordMaskPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should mask the password by default symbol if no custom ', () => {
    expect(pipe.transform('password', '*')).toBe('********');
  });

  it('uses provided  symbol', () => {
    expect(pipe.transform('password', '😂')).toBe('😂😂😂😂😂😂😂😂');
  });
});
