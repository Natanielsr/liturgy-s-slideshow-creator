# liturgy-s-slideshow-creator
Criador de slides para missa com músicas

Requisitos para usar o robo:
- instalação do node https://nodejs.org/en/

Como Executar o programa:

Opçao 1:
- Atraves da linha de comando va até a pasta do projeto
- Instale os pacotes utilizando o comando:    npm install
- Execute o programa com o comando: node app

Opção 2:
- Abrir o arquivo RunApp.bat


Como utilizar o programa:

Opção 1:
- Digite a letra s para aceitar a busca por nomes
- Digite os nomes das musicas confirmando com enter
- digite q para sair
- as musicas serão salvas no arquivo /resources/musicas.txt

Opção 2:
- As musicas não serão buscadas, assim é possivel escrever /resources/musicas.txt manualmente

Apos gerar o txt:
- O robo usara o txt na pasta resources para montar os slides

- Digite a data da liturgia, o robo ira buscar as leituras do dia

- O slide será gerado no formato .pptx na pasta /slide-result
