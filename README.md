# robotnode
Código inicial para meu projeto PIBIC, utilizando NodeJS.
O conceito é controlar um base robótica tenha encoders, ultrassônicos e motores (inicialmente).
A biblioteca responsavel para isso é a PIGPIO, responsável por manipular os GPIOs do Raspberry pi 3b+.

No início esta sendo construído uma interface gráfica em HTML, junto com socket.io, para auxiliar nos testes.
Porém, a ideia é realizar uma API de controle para executar comandos via requisição HTTP a base robótica.
