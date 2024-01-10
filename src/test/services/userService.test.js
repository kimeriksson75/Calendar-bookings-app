import Services from '../../services/userService';
import { users, auth } from '../../api';
import { handleError } from '../../services/handleError';
import { mockLocalStorage } from '../utils/mockLocalStorage';

const { setItemMock, removeItemMock } = mockLocalStorage();
jest.mock('../../services/handleError');
users.post = jest.fn();
auth.post = jest.fn();


const userResponse = {
    _id: '658055edfaa7d604c938ec48',
    username: 'johndoe',
    email: 'johndoe@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    residence: '65429601add7c81260092af3',
    roles: ['user'],
}
const usersResponse = [{
    _id: '658055edfaa7d604c938ec48',
    username: 'johndoe',
    email: 'johndoe@mail.com',
    firstname: 'John',
    lastname: 'Doe',
    residence: '65429601add7c81260092af3',
    roles: ['user'],
},{
    _id: '659d491207f75e99614006d9',
    username: 'jackblack',
    email: 'jack@mail.com',
    firstname: 'Jack',
    lastname: 'Black',
    residence: '65429601add7c81260092af3',
    roles: ['user'],
    }];

describe('userService reqister', () => {
    it('should call register', async () => {
        users.post.mockImplementationOnce(() =>
            Promise.resolve({ data: userResponse })
        );
        const response = await Services.register(userResponse);
        expect(response.data).toEqual(userResponse);
        expect(users.post).toHaveBeenCalledTimes(1);
        expect(users.post).toHaveBeenCalledWith(
            `/`,
            userResponse,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when register fails', async () => {
        const errorMessage = 'Network Error';
        users.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.register(userResponse);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('userService sign in', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    setItemMock.mockImplementationOnce(() => null);
    const userName = 'johndoe';
    const password = '1234';
    it('should call signIn', async () => {
        auth.post.mockImplementationOnce(() =>
            Promise.resolve({ data: userResponse })
        );
        const response = await Services.signIn(userName, password);
        expect(response.data).toEqual(userResponse);
        expect(auth.post).toHaveBeenCalledTimes(1);
        expect(auth.post).toHaveBeenCalledWith(
            `/`,
            { username: userName, password: password },
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith('user', JSON.stringify(response));
    });

    it('should return error when signIn fails', async () => {
        const errorMessage = 'Network Error';
        auth.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );
 
        await Services.signIn(userResponse);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('userService sign in with token', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    setItemMock.mockImplementationOnce(() => null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8';
    it('should call signInWithToken', async () => {
        users.post.mockImplementationOnce(() =>
            Promise.resolve({ data: userResponse })
        );
        const response = await Services.signInWithToken(token);
        expect(response.data).toEqual(userResponse);
        expect(users.post).toHaveBeenCalledTimes(1);
        expect(users.post).toHaveBeenCalledWith(
            `/authenticate/token`,
            { token },
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith('user', JSON.stringify(response));
    });

    it('should return error when signInWithToken fails', async () => {
        const errorMessage = 'Network Error';
        users.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.signInWithToken(token);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('userService sign out', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    removeItemMock.mockImplementationOnce(() => null);

    const tokens = {
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTgwMWU2MTg2NzAxNWEzZWU1OTNmZDgiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwMjg5NTIwMSwiZXhwIjoxNzAyOTgxNjAxfQ.iotB-37jSaHAbO2DAx8DkaeW-5WR2m_b71dBpd_12t8'
    }
    it('should call signOut', async () => {
        users.post.mockImplementationOnce(() =>
            Promise.resolve({ data: userResponse })
        );
        await Services.signOut(tokens);
        expect(users.post).toHaveBeenCalledTimes(1);
        expect(users.post).toHaveBeenCalledWith(
            `/sign-out`,
            tokens,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        expect(removeItemMock).toHaveBeenCalledTimes(1);
        expect(removeItemMock).toHaveBeenCalledWith('user');
    });

    it('should return error when signOut fails', async () => {
        const errorMessage = 'Network Error';
        users.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.signOut({ ...tokens });
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('userService request new password', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call requestNewPassword', async () => {
        users.post.mockImplementationOnce(() =>
            Promise.resolve({ data: userResponse })
        );
        await Services.requestNewPassword(userResponse.email);
        expect(users.post).toHaveBeenCalledTimes(1);
        expect(users.post).toHaveBeenCalledWith(
            `/reset-password-link`,
            { email: userResponse.email },
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when requestNewPassword fails', async () => {
        const errorMessage = 'Network Error';
        users.post.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.requestNewPassword(userResponse.email);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});