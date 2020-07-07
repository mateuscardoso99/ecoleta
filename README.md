# NLW_RocketSeat

Projeto construído durante a Next Level Week da RocketSeat, onde o objetivo foi desenvolver uma aplicação
web e mobile para cadastro e controle de pontos de coleta de diversos tipos de resíduos (orgânicos, eletrônicos, entre outros)

tanto a aplicação mobile, como a aplicação web consomem os dados de uma mesma API, contruída em Node JS,
a aplicação web foi desenvolvida utilizando ReactJS, e a mobile foi desenvolvida com React Native

### Executando as aplicações:

após o download, descompacte o arquivo zip
para inicializar a API em node js que está na pasta server, é preciso ter o Node instalado na sua máquina
para executar abra o terminal e entre na pasta server, e digite o comando: npm run dev, e o servidor será inicializado
abra um novo terminal e rode os comandos: npm run knex:seed, e o comando: npm run knex:migrate para configurar a base de dados

na aplicação web, que está dentro da pasta web, é preciso rodar dentro da pasta o comando: npm start
após isso a aplicação poderá ser acessada no navegador, abaixo o projeto em execução:

![](20200707_183806.gif)

para executar a aplicação mobile é preciso rodar o comando dentro da respectiva pasta: npm start, após isso será 
redirecionado para o navegador, para rodar a aplicação no celular é preciso ter o aplicativo expo instalado no celular,
ele está disponível na sua loja de aplicativos, apartir daí é só apontar a câmera do celular para o QRcode 
que aparece no navegador que a aplicação moblie será aberta dentro do expo
