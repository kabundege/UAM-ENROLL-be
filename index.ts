import os from 'os'
import http from 'http'
import app from './src/app'
import logging from './src/config/logging';

const server:http.Server = http.createServer(app)

const port = Number(process.env.PORT) || 1000;
// const networkInterfaces = os.networkInterfaces();
// const LocalIP = networkInterfaces['lo0'][0].address;
// const LanIp = networkInterfaces['en0'][1].address;
// const LanPort = `${LanIp}:${port}` ;

const NAMESPACE = "Initializer"

server.listen(port,():void => {
    logging.info(NAMESPACE, `Server is running ${port}`)
})