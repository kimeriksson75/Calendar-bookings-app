import Services from '../../services/serviceService';
import { services } from '../../api';
import { handleError } from '../../services/handleError';

jest.mock('../../services/handleError');
services.get = jest.fn();

const servicesResponse = [{
    _id: '656b75c56c0a78cef01c9cf0',
    name: 'Service 1',
    description: 'Service 1 description',
    residence: '65429601add7c81260092af3',
    __v: 0,
    alternateTimeslots: [
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T07:00:00.000Z',
            end: '2023-12-02T10:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T10:00:00.000Z',
            end: '2023-12-02T14:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T14:00:00.000Z',
            end: '2023-12-02T18:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T18:00:00.000Z',
            end: '2023-12-02T22:00:00.000Z',
            __v: 0,
        }
    ],
    timeslots: [
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T17:00:00.000Z',
            end: '2023-12-02T19:30:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T19:30:00.000Z',
            end: '2023-12-02T22:00:00.000Z',
            __v: 0,
        },
    ],
},{
    _id: '656b75c56c0a78cef01c9cf0',
    name: 'Service 2',
    description: 'Service 2 description',
    residence: '65429601add7c81260092af3',
    __v: 0,
    alternateTimeslots: [
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T07:00:00.000Z',
            end: '2023-12-02T10:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T10:00:00.000Z',
            end: '2023-12-02T14:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T14:00:00.000Z',
            end: '2023-12-02T18:00:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T18:00:00.000Z',
            end: '2023-12-02T22:00:00.000Z',
            __v: 0,
        }
    ],
    timeslots: [
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T17:00:00.000Z',
            end: '2023-12-02T19:30:00.000Z',
            __v: 0,
        },
        {
            _id: '5f9a7b8f3f5a6a1a0c5b6f2f',
            userid: null,
            username: '',
            start: '2023-12-02T19:30:00.000Z',
            end: '2023-12-02T22:00:00.000Z',
            __v: 0,
        },
    ],
}];

describe('get available services', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getAvailableServices', async () => {
        
        services.get.mockImplementationOnce(() =>
            Promise.resolve({ data: servicesResponse })
        );
        const response = await Services.getAvailableServices();
        expect(response.data).toEqual(servicesResponse);
        expect(services.get).toHaveBeenCalledTimes(1);
        expect(services.get).toHaveBeenCalledWith(
            `/`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getAvailableServices fails', async () => {
        const errorMessage = 'Network Error';
        services.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getAvailableServices(servicesResponse[0].residence);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});

describe('get services by residence', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getServicesByResidence', async () => {
        
        services.get.mockImplementationOnce(() =>
            Promise.resolve({ data: servicesResponse })
        );
        const response = await Services.getServicesByResidence(servicesResponse[0].residence);
        expect(response.data).toEqual(servicesResponse);
        expect(services.get).toHaveBeenCalledTimes(1);
        expect(services.get).toHaveBeenCalledWith(
            `/residence/${servicesResponse[0].residence}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getServicesByResidence fails', async () => {
        const errorMessage = 'Network Error';
        services.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getServicesByResidence(servicesResponse[0].residence);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});