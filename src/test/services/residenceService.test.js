import Services from '../../services/residenceService';
import { residences } from '../../api';
import { handleError } from '../../services/handleError';

jest.mock('../../services/handleError');
residences.get = jest.fn();

const residencesResponse = [{
    _id: '65429601add7c81260092af3',
    name: 'Residence 1',
},
{
    _id: '65429601add7c81260092af4',
    name: 'Residence 2',
    }];

describe('residenceService', () => {
    it('should call getAvailableResidences', async () => {
        
        residences.get.mockImplementationOnce(() =>
            Promise.resolve({ data: residencesResponse })
        );
        const response = await Services.getAvailableResidences();
        expect(response.data).toEqual(residencesResponse);
        expect(residences.get).toHaveBeenCalledTimes(1);
        expect(residences.get).toHaveBeenCalledWith(
            `/`,
            {
                headers: {
                    authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN_SECRET}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    });

    it('should return error when getAvailableResidences fails', async () => {
        const errorMessage = 'Network Error';
        residences.get.mockImplementationOnce(() =>
            Promise.reject({ error: errorMessage })
        );

        await Services.getAvailableResidences();
        expect(handleError).toHaveBeenCalledTimes(1);
        expect(handleError).toHaveBeenCalledWith({ error: errorMessage });
    });
});