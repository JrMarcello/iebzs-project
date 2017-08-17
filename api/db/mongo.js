import mongoose from 'mongoose';

export default (config) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(config.DB_HOST + config.DB_NAME);

  mongoose.connection.on('connected', () => {
    console.log('Mongoose conectado em: ' + config.DB_HOST + config.DB_NAME);
  });

  mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão Mongoose: ' + err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose foi desconectado');
  });

  mongoose.connection.on('open', () => {
    console.log('Nova conexão aberta');
  });

  // Quando o processo do Node for parado, fechar a conexão com o Mongoose
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Aplicação encerrada...');
      process.exit(1);
    });
  });
};
