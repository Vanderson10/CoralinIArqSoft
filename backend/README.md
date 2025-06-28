<h1 align="center"> 
	CoralinIA | Backend 
</h1>

<h4 align="center"> 
	👍 Análise e Correção de Redações 🤖
</h4>


## <a id="descricao"></a>Descrição 📋
Correção de redações com LLM utilizando Linhas Argumentativas.

## <a id="tecnologias"></a>Tecnologias 🛠
[![Python](https://img.shields.io/badge/Python-336d9d?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Llama 3](https://img.shields.io/badge/Llama_3-%230467DF.svg?style=for-the-badge&logo=Meta&logoColor=white)](https://www.llama.com)
[![Groq](https://img.shields.io/badge/groq_api-F54A2A?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![MongoDB](https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## <a id="como-rodar"></a>Como rodar 💻
### Pré-requisitos
Você precisa ter instalado na sua máquina:
- [Git](https://git-scm.com)
- [Python 3.x](https://www.python.org/downloads/)
- [pip](https://pypi.org/project/pip/) (atualizado)
- [MongoDB](https://www.mongodb.com/try/download/community)

É importante que o servidor do MongoDB esteja **ativo** (em execução).


### Criar o ambiente virtual 🐍
#### Entrar na pasta do backend
```bash
cd backend
```
#### Criar e configurar o venv (python virtual environment)
```bash
python3 -m venv .venv
```
### Ativar o venv
- Esse comando deve ser repetido sempre que iniciar um novo terminal:
```bash
# Para sistemas Unix/MacOS
source .venv/bin/activate

# Para Windows (cmd ou PowerShell)
.venv\Scripts\activate
```
### Instalando Dependencias 🤫

```bash
python3 -m pip install -r ./requirements.txt
```

### Executando em modo Dev ▶️
```bash
uvicorn app.main:app --reload
```

### Desativar o venv (opcional)
```bash
deactivate
```

### Adicionando a Key da Groq API 🔑
1. Crie uma conta gratuita no [Groq](https://groq.com).
2. Crie uma API Key e copie.
3. Insira na página inicial da aplicação.

## Acessando a Documentação Interativa da API 📄
Para testar a API, em uma interface similar ao _Swagger_, acesse esta [URL](http://localhost:8000/docs) no navegador, que leva à documentação interativa que é gerada automaticamente.

Aproveite! 🎉


- BUILD FRONTEND

```code

cd frontend

docker build -t andrezasantana/private-images:coralinia-fe-latest .

docker push andrezasantana/private-images:coralinia-fe-latest

```

- BUILD BACKEND

```code

cd backend

docker build -t andrezasantana/private-images:coralinia-be-latest .

docker push andrezasantana/private-images:coralinia-be-latest

```


- RODAR LOCALMENTE

```code

docker run -d -p 8080:80 --restart always --name coralinia-be coralinia-be

docker run -d -p 80:80 --restart always --name coralinia-fe coralinia-fe

```

- ATUALIZAR IMAGEM NA VM 

```code

docker pull andrezasantana/private-images:coralinia-fe-latest

docker pull andrezasantana/private-images:coralinia-be-latest

```

- MATAR OS CONTAINERS ANTIGOS

```code

docker rm -vf coralinia-fe

docker rm -vf coralinia-be

```

- RODAR NA VM 

```code

docker run -d -p 80:80 --restart always --name coralinia-fe andrezasantana/private-images:coralinia-fe-latest

docker run -d -p 9000:80 --restart always --name coralinia-be andrezasantana/private-images:coralinia-be-latest

```
