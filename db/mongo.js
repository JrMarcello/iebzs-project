'use strict'

import mongoose from 'mongoose';

export default function(config) {
    mongoose.Promise = global.Promise;

    mongoose.connect(config.DB_HOST + config.DB_NAME);
    
    mongoose.connection.on('connected', function () {
        console.log('Mongoose conectado em: ' + config.DB_HOST + config.DB_NAME);
    });
    
    mongoose.connection.on('error', function (err) {
        console.log('Erro na conexão Mongoose: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose foi desconectado');
    });

    mongoose.connection.on('open', function () {
        console.log('Nova conexão aberta');
    });

    //Quando o processo do Node for parado, fechar a conexão com o Mongoose
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Conexão com Mongoose encerrada pela aplicação');
            process.exit(1);
        });
    });
}
