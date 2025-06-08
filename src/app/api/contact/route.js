//jgtc uqri jfqv baco


import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  // CORS para desenvolvimento (ajuste para produção)
  if (req.method === 'OPTIONS') {
    return NextResponse.json(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const form = formidable({ multiples: false });

  try {
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Validação
    if (!fields.name || !fields.email || !fields.message) {
      return NextResponse.json(
        { message: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Configuração do Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arianysferreira1@gmail.com', // Seu email do Gmail
        pass: 'jgtc uqri jfqv baco', // Senha de app
      },
    });

    const mailOptions = {
      from: `"${fields.name}" <${fields.email}>`,
      to: 'arianysferreira1@gmail.com', // Seu email do Gmail
      subject: fields.subject || 'Contato do site',
      text: `
        Nova mensagem de contato:
        Nome: ${fields.name}
        Email: ${fields.email}
        Tipo: ${fields.type || 'Não informado'}
        Mensagem: ${fields.message}
      `,
      attachments: files.file
        ? [
            {
              filename: files.file.originalFilename || 'anexo',
              content: fs.readFileSync(files.file.filepath),
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // Limpar arquivo temporário
    if (files.file) {
      fs.unlink(files.file.filepath, () => {});
    }

    return NextResponse.json(
      { message: 'Email enviado com sucesso!' },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  } catch (error) {
    console.error('Erro no endpoint de contato:', error);
    return NextResponse.json(
      { message: error.message || 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
};