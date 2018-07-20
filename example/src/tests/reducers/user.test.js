/* global describe, it, expect */

import reducer from '../../reducers/user';
import { SAVE_USER_TOKEN } from '../../actions';

import userFixture from '../fixtures/user.json';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle SAVE_USER_TOKEN', () => {
    expect(reducer({}, {
      type: SAVE_USER_TOKEN,
      user: userFixture
    })).toEqual(
      userFixture
    );
  });

  it('should handle SAVE_USER_TOKEN on previous saved replacing it', () => {
    expect(reducer(userFixture, {
      type: SAVE_USER_TOKEN,
      user: {
        ...userFixture,
        token: 'd23rfadfrj32fkk3454',
      }
    })).toEqual({
      ...userFixture,
      token: 'd23rfadfrj32fkk3454',
    });
  });
});
