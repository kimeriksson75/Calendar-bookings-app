import Services from '../../services/apartmentService';
import { apartments } from '../../api';
import { handleError } from '../../services/handleError';

jest.mock('../../services/handleError');
apartments.get = jest.fn();

const apartmentsResponse = [{
    _id: '6542961aadd7c81260092afa',
    name: 'Apartment 1',
    residence: '65429601add7c81260092af3',
},
{
    _id: '6543ed3452552f1f176afe12',
    name: 'Apartment 2',
    residence: '65429601add7c81260092af3',
}];
describe('apartmentService', () => {
    it('should call getAvailableApartments', async () => {
        
        apartments.get.mockImplementationOnce(() =>
            Promise.resolve({ data: apartmentsResponse })
        );
        const response = await Services.getAvailableApartments(apartmentsResponse[0].residence);
        expect(response.data).toEqual(apartmentsResponse);
        expect(apartments.get).toHaveBeenCalledTimes(1);
        expect(apartments.get).toHaveBeenCalledWith(
            `/residence/${apartmentsResponse[0].residence}`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getAvailableApartments fails', async () => {
        const errorMessage = 'Network Error';
        apartments.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getAvailableApartments(apartmentsResponse[0].residence);
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
})
