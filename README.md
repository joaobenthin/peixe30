# Peixe30

Este projeto foi desenvolvido como parte de um teste técnico para avaliar minhas habilidades utilizando Node.js e React Native.

## Instalação

Para executar este projeto localmente, siga estas etapas:

1. Clone este repositório usando o comando:

```bash
git clone https://github.com/joaobenthin/peixe30
```

2. Navegue até o diretório do projeto:

```bash
cd peixe30
```

3. Navegue até o diretório do aplicativo (mobile):

```bash
cd mobile
```

4. Instale as dependências usando npm ou yarn

```bash
npm install
```

ou

```bash
yarn install
```

5. Inicie o bundle do projeto:

```bash
npm start
```

## Estrutura do Projeto

- src/: Contém o código-fonte do projeto.
  - components/: Componentes reutilizáveis.
  - constants/: Constantes do aplicativo.
  - context/: Contextos do aplicativo.
  - routes/: Configuração de navegação.
  - screens/: Telas do aplicativo.
  - services/: Serviços para comunicação com APIs, armazenamento local, etc.
  - types/: Contém definições de tipos personalizadas
  - utils/: Funções e utilitários auxiliares.
- App.tsx: Ponto de entrada do aplicativo.

## Bibliotecas Utilizadas e Justificativa

As seguintes bibliotecas foram utilizadas neste projeto:

[React Navigation](): O React Navigation é uma biblioteca de roteamento e navegação para React Native. Ele facilita a criação de navegação fluida e intuitiva em aplicativos móveis React Native, oferecendo uma ampla gama de opções de navegação.

[@rocketseat/eslint-config](): Este é um conjunto de configurações do ESLint fornecido pela Rocketseat, otimizado para projetos React Native. O ESLint é uma ferramenta de análise estática de código que ajuda a identificar e corrigir problemas de estilo e boas práticas de codificação no código JavaScript.

[eslint-plugin-simple-import-sort](): Este é um plugin para o ESLint que implementa uma regra de ordenação de imports simples e direta. Ele ajuda a manter a consistência na organização dos imports no seu código JavaScript, melhorando a legibilidade e a manutenibilidade.

[Axios](): Biblioteca simplificada para fazer requisições HTTP, oferecendo uma interface limpa e intuitiva, além de recursos avançados como interceptadores e suporte a promessas, sendo amplamente adotada na comunidade.

[React Native Paper](): Biblioteca de componentes UI para React Native, seguindo as diretrizes de Material Design, oferecendo uma vasta coleção de componentes prontos para uso, personalizáveis e integrados com temas e estilos.

[React Native Vector Icons](): Fornece uma ampla seleção de ícones vetoriais de alta qualidade, escaláveis e customizáveis, permitindo uma fácil adição de ícones aos componentes, sem a necessidade de imagens estáticas, e altamente personalizável.

> A decisão de instalar uma biblioteca dentro do projeto na minha opinião tem que ser levado vários fatores, como por exemplo:

- É possível fazer sem biblioteca?
- Possui compatibilidade com a versão do React Native?
- Popularidade e suporte da comunidade
- A instalação da biblioteca vai facilitar o desenvolvimento e trazer produtividade?
- A biblioteca possui uma boa documentação?
- Ela está sendo atualizada e mantida pela comunidade (caso seja open-source) e não está depreciada?

## Pontos de melhoria

- Desenvolvimento de uma página de editar o contato.
- Utilizar um design system para desenvolvimento das telas, componentes e textos próprios para o aplicativo.
- Implementar um login social utilizando Google Auth, Apple Auth por exemplo para entrar no app
- Adicionar animações para tornar a experiência do usuário mais agradável
- Melhorar as validações dos formulários e campos utilizando uma biblioteca como por exemplo React Hook Form, Zod, Yup.
- Escrever testes automatizados para garantir a qualidade dos fluxos
