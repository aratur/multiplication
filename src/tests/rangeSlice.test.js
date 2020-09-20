import store from '../redux-store/store';
import { generateNextQuestion } from '../redux-store/rangeSlice';

// These are not exhaustive UnitTests for the store, thyme are patching
// coverage wholes left after components testing. At the same time,
// these cover mostly cases difficult to reproduce through integration tests.
describe('Store - range', () => {
  it('should generate new questions set after using up initial questions', () => {
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(99);
    Array(99).fill(0).forEach(() => {
      store.dispatch(generateNextQuestion());
    });
    expect(Object.keys(store.getState().range.allPossibleAnswers).length).toBe(100);
  });
});
