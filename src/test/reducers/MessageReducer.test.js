import MessageReducer from '../../reducers/MessageReducer';
import * as actions from '../../constants';

const initialState = [];

describe('MessageReducer', () => {
    it('should return the initial state', () => {
        expect(MessageReducer([], {})).toEqual(initialState);
    });

    it('should handle NEW_MESSAGE', () => {
        expect(
            MessageReducer(initialState, {
                type: actions.NEW_MESSAGE,
                payload: 'Hello World',
            })
        ).toEqual({ message: 'Hello World' });
    });
});