import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from 'src/types/customer';
import { addCustomerField, sendCustomerData } from './customerThunk';

interface CustomerState {
  customer: Customer;
  loading: boolean;
  success: boolean;
  error: string;
}

const initialState: CustomerState = {
  customer: {
    ID: '',
    Código: '',
    Nome: '',
    Fantasia: '',
    Endereço: '',
    Número: '',
    Complemento: '',
    Bairro: '',
    CEP: '',
    Cidade: '',
    UF: '',
    Contatos: '',
    Fone: '',
    Fax: '',
    Celular: '',
    'E-mail': '',
    'Web Site': '',
    'Tipo pessoa': 'Pessoa física',
    'CNPJ / CPF': '',
    'IE / RG': '',
    'IE isento': '',
    Situação: 'Ativo',
    Observações: '',
    'Estado civil': '',
    Profissão: '',
    Sexo: '',
    'Data nascimento': '',
    Naturalidade: '',
    'Nome pai': '',
    'CPF pai': '',
    'Nome mãe': '',
    'CPF mãe': '',
    Segmento: '',
    Vendedor: '',
    'Tipo contato': 'Cliente',
    'E-mail para envio NFe': '',
    'Limite de crédito': '0',
    'Cliente desde': '',
    'Próxima visita': '',
    'Condição de pagamento': '',
    'Regime tributário': '',
  },
  loading: false,
  error: '',
  success: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerField: (
      state,
      action: PayloadAction<{ field: keyof Customer; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.customer[field] = value;
    },
    updateCustomer(state, action: PayloadAction<Customer>) {
      state.customer = { ...state.customer, ...action.payload };
    },
    resetCustomer(state) {
      state.customer = initialState.customer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCustomerField.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder
      .addCase(sendCustomerData.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = false;
      })
      .addCase(sendCustomerData.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendCustomerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCustomerField, updateCustomer, resetCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;

export type { CustomerState };
