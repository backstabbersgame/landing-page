import { AppDispatch } from './index';
import {
  setAddressField,
  setApiAddress,
  setErrors,
  setLoading,
  clearErrors,
} from './addressSlice';
import axios from 'axios';
import { Address } from 'src/types/address';

export const fetchAddressByCep =
  (cep: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearErrors());

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        dispatch(setErrors({ cep: 'CEP não encontrado' }));
      }

      const addressData: Address = {
        cep: response.data.cep,
        uf: response.data.uf,
        city: response.data.localidade,
        neighborhood: response.data.bairro,
        address: response.data.logradouro,
        number: '',
        additionalAddress: '',
      };

      Object.entries(addressData).forEach(([field, value]) => {
        dispatch(setAddressField({ field: field as keyof Address, value }));
        if (field !== 'neighborhood') {
          dispatch(setApiAddress({ field: field as keyof Address, value }));
        }
      });

      dispatch(setErrors({}));
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
      dispatch(setErrors({ cep: 'CEP inválido ou não encontrado' }));
    } finally {
      dispatch(setLoading(false));
    }
  };
