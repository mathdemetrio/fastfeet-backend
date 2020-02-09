<p align=center><img style='max-width: 300px;' src='.github/logofastfeet.png'></p>
<h2 align='center'>Desafio GoStack - API FastFeet</h2>
<hr>
<p>O desafio consiste em criar uma API completa para gerenciamento de entregas de encomendas. Algumas das funcionalidaeds são:</p>
<ul>
  <li>CRUD de usuário administrador da transportadora;</li>
  <li>Autenticação do administrador utilizando JWT;</li>
  <li>CRUD de entregadores;</li>
  <li>Upload de imagem para perfil do entregador e foto da assinatura do destinatário;</li>
  <li>CRUD de destinatários;</li>
  <li>CRUD de entregas;</li>
  <li>CRUD de problemas nas entregas;</li>
  <li>Cancelamento de entrega;</li>
  <li>Inicialização e finalização do processo de entrega;</li>
  <li>Disparo de emails utilizando background jobs com Redis e Bee-queue;</li>
</ul>
<br>
<h2>Tecnologias e bibliotecas utilizadas:</h2>
<hr>
<ul>
  <li>Express</li>
  <li>Postgres</li>
  <li>Redis</li>
  <li>sequelize</li>
  <li>jsonwebtoken</li>
  <li>nodemailer</li>
  <li>nodemailer-express-handlebars</li>
  <li>express-handlebars</li>
  <li>bee-queue</li>
  <li>sentry</li>
  <li>bcryptjs</li>
  <li>express-async-errors</li>
  <li>multer</li>
  <li>date-fns</li>
  <li>dotenv</li>
  <li>youch</li>
  <li>yup</li>
</ul>
<br>
<h2>Executando e configurando a aplicação:</h2>
<hr>
<h3>Criando container <b>Docker</b> para Postgres e Redis:</h3>
<ul>
  <li>docker run --name database -e POSTGRES_PASSWORD=password_here -p 5432:5432 -d postgres</li>
  <li>docker run --name redis -p 6379:6379 -d -t redis:alpine
</ul>
<h3>Executando a aplicação pela primeira vez:</h3>
<ul>
  <li>yarn</li>
  <li>yarn sequelize db:migrate</li>
  <li>yarn sequelize db:seed:all</li>
  <li>yarn dev && yarn queue</li>
</ul>
<br>
<h2>Sugestões de ferramentas auxiliares para desenvolvimento e produção:</h2>
<hr>
<ul>
  <li>Insomnia - Para simular requisições a API;</li>
  <li>Postbird - Visualizar banco de dados Postgres;</li>
  <li>Sentry - Visualizador e gerenciador de erros da aplicação - Muito útil quando em produção;</li>
  <li>Mailtrap para teste de envio e recebimento de e-mails;</li>
</ul>
