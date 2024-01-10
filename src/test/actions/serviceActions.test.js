import * as actions from '../../actions/serviceActions';
import Services from '../../services/serviceService';
import * as types from '../../constants';

const service = {
    selectedService: {
        _id: '656b75c56c0a78cef01c9cf0',
        id: '656b75c56c0a78cef01c9cf0',
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
    },
};

Services.getAvailableServices = jest.fn();
Services.getServicesByResidence = jest.fn();

describe('get available services action', () => {

    it('should create an action to fetch available services', async () => {
        const dispatch = jest.fn();

        Services.getAvailableServices.mockImplementationOnce(async () => Promise.resolve({
            data: service
        }));
        const initialGetAvailableServicesAction = {
            type: types.FETCH_SERVICES,
            payload: null
        }
        const getAvailableServicesSuccessAction = {
            type: types.FETCH_SERVICES_SUCCESS,
            payload: service
        }
       
        await actions.getAvailableServices()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableServicesAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableServicesSuccessAction);
            });
    });

    it('should handle fetch available services error', async () => {
        const dispatch = jest.fn();

        Services.getAvailableServices.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialGetAvailableServicesAction = {
            type: types.FETCH_SERVICES,
            payload: null
        }
        const getAvailableServicesErrorAction = {
            type: types.FETCH_SERVICES_ERROR,
            payload: null
        }
       
        await actions.getAvailableServices()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetAvailableServicesAction);
                expect(dispatch).toHaveBeenCalledWith(getAvailableServicesErrorAction);
            });
    });
});
    
describe('get services by residence action', () => {

    it('should create an action to fetch services by residence', async () => {
        const dispatch = jest.fn();

        Services.getServicesByResidence.mockImplementationOnce(async () => Promise.resolve({
            data: service
        }));
        const initialGetServicesByResidenceAction = {
            type: types.FETCH_SERVICES_BY_RESIDENCE,
            payload: null
        }
        const getServicesByResidenceSuccessAction = {
            type: types.FETCH_SERVICES_BY_RESIDENCE_SUCCESS,
            payload: service
        }
       
        await actions.getServicesByResidence()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetServicesByResidenceAction);
                expect(dispatch).toHaveBeenCalledWith(getServicesByResidenceSuccessAction);
            });
    });

    it('should handle fetch services by residence error', async () => {
        const dispatch = jest.fn();

        Services.getServicesByResidence.mockImplementationOnce(async () => Promise.reject({
            data: null,
        }));
        const initialGetServicesByResidenceAction = {
            type: types.FETCH_SERVICES_BY_RESIDENCE,
            payload: null
        }
        const getServicesByResidenceErrorAction = {
            type: types.FETCH_SERVICES_BY_RESIDENCE_ERROR,
            payload: null
        }
       
        await actions.getServicesByResidence()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith(initialGetServicesByResidenceAction);
                expect(dispatch).toHaveBeenCalledWith(getServicesByResidenceErrorAction);
            });
    });

    it('should create an action to set selected service', () => {
        const dispatch = jest.fn();
        const setSelectedServiceAction = {
            type: types.SET_SELECTED_SERVICE,
            payload: service
        }
        actions.setSelectedService(service)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setSelectedServiceAction);
    });

    it('should create an action to unset selected service', () => {
        const dispatch = jest.fn();
        const setSelectedServiceAction = {
            type: types.SET_SELECTED_SERVICE,
            payload: null
        }
        actions.unsetSelectedService()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(setSelectedServiceAction);
    });
});
