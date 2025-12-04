import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'API para gerenciamento de uma plataforma de e-commerce',
  },
  servers: [
    {
      url: 'http://127.0.0.1:5001/e-commerce-42ff1/us-central1/api',
      description: 'DESENVOLVIMENTO',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    schemas: {
      login: {
        $email: "usuario@mail.com",
        $password: "123456"
      },
      recovery: {
        $email: "usuario@mail.com",
      },
      User: {
        $id: "1SBiiMrf4JUUFG57M76F",
        $nome: "João da Silva",
        $email: "joaodasilva@mail.com",
      },
      addUser: {
        $name: 'João Silva',
        $email: 'joaosilva@email.com',
        $password: 'J12345'
      },
      updateUser: {
        $nome: "João da Silva",
        $email: "joaodasilva@mail.com",
        password: "J54321"
      },
      addCompany: {
        $logomarca: "https://jornadadev.com.br/logo.png",
        $cpfCnpj: "15647055000165",
        $razaoSocial: "Jornada Dev Media Digital Solutions Ltda",
        $nomeFantasia: "Jornada de Programador",
        $telefone: "64999999999",
        $horarioFuncionamento: "De Seg a Sex das 08h às 18h",
        $endereco: "Rua Contrua seu Futuro, 100, Centro",
        $localizacao: "https://maps.app.goo.gl/uXL3hjfu3vR1u4uY9",
        $taxaEntrega: 9.99,
        ativa: true
      },
      updateCompany: {
        $logomarca: "https://jornadadev.com.br/logo.png",
        $cpfCnpj: "15647055000165",
        $razaoSocial: "Jornada Dev Media Digital Solutions Ltda",
        $nomeFantasia: "Jornada de Programador",
        $telefone: "64999999999",
        $horarioFuncionamento: "De Seg a Sex das 08h às 18h",
        $endereco: "Rua Contrua seu Futuro, 100, Centro",
        $localizacao: "https://maps.app.goo.gl/uXL3hjfu3vR1u4uY9",
        $taxaEntrega: 9.99,
        $ativa: true
      },
      addCategory: {
        $descricao: "Importados",
        $ativa: true,
      },
      updateCategory: {
        $descricao: "Nacionais",
        $ativa: false,
      },
      addProduct: {
        $nome: "Smart TV Samsung 55'",
        descricao: "A maior TV do momento.",
        $preco: 5479.99,
        imagem: null,
        $categoria: {
          $id: "2mkre4j5gPo0BFGl5pyi"
        },
        ativa: true,
      },
      updateProduct: {
        $nome: "Smart TV Samsung 55'",
        descricao: "A maior TV do momento.",
        $preco: 5479.99,
        imagem: null,
        $categoria: {
          $id: "2mkre4j5gPo0BFGl5pyi"
        },
        $ativa: false,
      },
      addPaymentMethod: {
        $descricao: "Pix",
        ativa: true,
      },
      updatePaymentMethod: {
        $descricao: "Cartão de Crédito",
        $ativa: false,
      },
      addOrder: {
        $empresa: {
          $id: "1SBiiMrf4JUUFG57M76F",
        },
        $cliente: {
          $nome: "João da Silva",
          $telefone: "11999999999",
        },
        endereco: {
          cep: "75900000",
          $logradouro: "Rua Xuxu Beleza",
          $numero: "11",
          $bairro: "Setor XPTO",
          $complemento: "Qd 1 Lt 2",
          $cidade: "Não-Me-Toque",
          $uf: "RS"
        },
        cpfCnpjCupom: null,
        $isEntrega: true,
        $formaPagamento: {
          $id: "NdmCoYl0iT3gHwhO0pyQ",
        },
        $taxaEntrega: 100,
        $items: [{
          $produto: {
            $id: "3UfzI8CSCaK5eC0UJ8gI",
          },
          $qtde: 1,
          $observacao: null,
        }],
        status: {
          "@enum": ["pendente", null]
        },
        observacoes: null,
      },
      updateOrderStatus: {
        $status: {
          "@enum": ["aprovado", "entrega", "concluido", "cancelado"]
        },
      },
    },
    parameters: {
      empresaId: {
        name: 'empresaId',
        in: 'query',
        description: 'Id da empresa',
        schema: {
          type: 'string'
        }
      },
      dataInicio: {
        name: 'dataInicio',
        in: 'query',
        description: 'Data de início do filtro no formato YYYY-MM-DD',
        schema: {
          type: 'date'
        }
      },
      dataFim: {
        name: 'dataFim',
        in: 'query',
        description: 'Data de fim do filtro no formato YYYY-MM-DD',
        schema: {
          type: 'date'
        }
      },
      orderStatus: {
        name: 'status',
        in: 'query',
        description: 'Status do pedido',
        schema: {
          type: 'string',
          enum: ['pendente', 'aprovado', 'entrega', 'concluido', 'cancelado']
        }
      }
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints de autenticação',
    },
    {
      name: 'Users',
      description: 'Endpoints de usuários',
    },
    {
      name: 'Categories',
      description: 'Endpoints de categorias',
    },
    {
      name: 'Companies',
      description: 'Endpoints de empresas',
    },
    {
      name: 'PaymentMethods',
      description: 'Endpoints de formas de pagamento',
    },
    {
      name: 'Orders',
      description: 'Endpoints de pedidos',
    },
    {
      name: 'Products',
      description: 'Endpoints de produtos',
    },
  ],
};

const outputFile = './src/docs/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);