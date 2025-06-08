import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export const POST = async (req) => {
  if (req.method === 'OPTIONS') {
    return NextResponse.json(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
  try {
    const body = await req.json();
    const customerData = body.customerData;

    if (!customerData) {
      return NextResponse.json(
        { error: 'Dados do cliente não fornecidos' },
        { status: 400 }
      );
    }

    const googleSheets = google.sheets({ version: 'v4', auth });

    const response = await googleSheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SPREADSHEET_NAME}!A2:AO`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            customerData.ID,
            customerData['Código'],
            customerData.Nome,
            customerData.Fantasia,
            customerData['Endereço'],
            customerData['Número'],
            customerData.Complemento,
            customerData.Bairro,
            customerData.CEP,
            customerData.Cidade,
            customerData.UF,
            customerData.Contatos,
            customerData.Fone,
            customerData.Fax,
            customerData.Celular,
            customerData['E-mail'],
            customerData['Web Site'],
            customerData['Tipo pessoa'],
            customerData['CNPJ / CPF'],
            customerData['IE / RG'],
            customerData['IE isento'],
            customerData['Situação'],
            customerData['Observações'],
            customerData['Estado civil'],
            customerData['Profissão'],
            customerData.Sexo,
            customerData['Data nascimento'],
            customerData.Naturalidade,
            customerData['Nome pai'],
            customerData['CPF pai'],
            customerData['Nome mãe'],
            customerData['CPF mãe'],
            customerData.Segmento,
            customerData.Vendedor,
            customerData['Tipo contato'],
            customerData['E-mail para envio NFe'],
            customerData['Limite de crédito'],
            customerData['Cliente desde'],
            customerData['Próxima visita'],
            customerData['Condição de pagamento'],
            customerData['Regime tributário'],
          ],
        ],
      },
    });

    if (response.data?.updates?.updatedCells) {
      return NextResponse.json(
        { message: 'Dados enviados com sucesso' },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }
  } catch (error) {
    console.error('Erro ao enviar dados para o Google Sheets:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar dados para o Google Sheets' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
};

export const GET = async () => {
  try {
    const googleSheets = google.sheets({ version: 'v4', auth });

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${process.env.SPREADSHEET_NAME}!A2:AO`,
    });

    const rows = response.data.values;
    if (!rows) {
      return NextResponse.json(
        { error: 'Dados não encontrados' },
        { status: 404 }
      );
    }

    const customers = rows.map((row) => ({
      nome: row[2],
      email: row[15].replace(/(.{4}).*(@.*)/, '$1*******$2'),
      cpf: row[18].replace(/\d{3}\.\d{3}/, '***.***').replace(/-\d{2}$/, '-**'),
      clienteDesde: row[37],
    }));
    return NextResponse.json(customers);
  } catch (error) {
    console.error('Falha ao buscar dados:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar dados' },
      { status: 500 }
    );
  }
};
