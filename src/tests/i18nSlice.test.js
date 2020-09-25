import store from '../redux-store/store';
import { i18n, setCurrentLanguage } from '../redux-store/i18nSlice';

describe('i18nSlice', () => {
  it('should translate no parameters entry', () => {
    const translations = {
      component: { label: 'test' },
    };
    expect(i18n(translations, 'component.label')).toBe('test');
  });

  it('should return null if translations are not provided', () => {
    expect(i18n(undefined, 'component.label')).toBe(null);
  });

  it('should return null if path in the statement is incorrect', () => {
    const translations = {
      component: { label: 'test' },
    };
    expect(i18n(translations, 'component.wrongLabel')).toBe(null);
  });

  it('should translate entry with translation at the first node', () => {
    const translations = {
      label: 'test',
    };
    expect(i18n(translations, 'label')).toBe('test');
  });
  it('should translate entry with undefined parameters', () => {
    const translations = {
      label: 'test {0}',
    };
    expect(i18n(translations, 'label')).toBe('test {0}');
  });
  it('should translate entry with malformed entry', () => {
    const translations = {
      label: 'test {0',
    };
    expect(i18n(translations, 'label')).toBe('test {0');
  });
  it('should change current language according to payload', () => {
    store.dispatch(setCurrentLanguage({ language: 'pl' }));
    expect(store.getState().i18n.currentLanguage).toBe('pl');
    store.dispatch(setCurrentLanguage({ language: 'en' }));
    expect(store.getState().i18n.currentLanguage).toBe('en');
  });
  it('should not change language if language type is not allowed', () => {
    store.dispatch(setCurrentLanguage({ language: 'pl' }));
    expect(store.getState().i18n.currentLanguage).toBe('pl');
    store.dispatch(setCurrentLanguage({ language: 'de' }));
    expect(store.getState().i18n.currentLanguage).toBe('pl');
  });
  it('should not change language if language type is not provided', () => {
    store.dispatch(setCurrentLanguage({ language: 'pl' }));
    expect(store.getState().i18n.currentLanguage).toBe('pl');
    store.dispatch(setCurrentLanguage({}));
    expect(store.getState().i18n.currentLanguage).toBe('pl');
  });
});
