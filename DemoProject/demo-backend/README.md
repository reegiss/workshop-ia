# DemoBank (backend Java)

Projeto de exemplo organizado em Clean Architecture, espelhando o `Demo-ios` e o `demo-android`. Por enquanto só tem a estrutura de pastas, sem implementação.

No backend não há tela, então o lugar do MVVM é ocupado pela camada web: controllers, requests e responses.

## Camadas

```
src/main/java/com/demo/bank/
├── domain/                 regras de negócio, sem dependência de framework ou banco
│   ├── entity/             modelos do domínio (records imutáveis)
│   ├── usecase/            um caso de uso por arquivo, orquestra a regra
│   ├── repository/         interfaces dos repositórios (contratos, sem implementação)
│   └── error/              exceções do domínio
├── data/                   implementa os contratos do domínio
│   ├── repository/         implementações das interfaces de domain/repository
│   ├── datasource/
│   │   ├── remote/         clientes de APIs externas
│   │   └── local/          banco de dados, cache
│   ├── dto/                modelos de persistência e de integração
│   └── mapper/             DTO → Entity
├── presentation/           camada web
│   ├── controller/         endpoints, chamam os casos de uso
│   ├── request/            corpo de entrada dos endpoints
│   ├── response/           corpo de saída dos endpoints
│   └── handler/            tradução de erros do domínio para respostas HTTP
└── di/                     composition root: monta as dependências

src/test/java/com/demo/bank/
├── domain/usecase/
├── data/repository/
├── data/mapper/
├── presentation/controller/
└── testdouble/             stubs, spies e fakes das interfaces
```

| iOS (`Demo-ios`)          | Android (`demo-android`)  | Backend (`demo-backend`)        |
|---------------------------|---------------------------|---------------------------------|
| `Domain/Entities`         | `domain/entity`           | `domain/entity`                 |
| `Domain/UseCases`         | `domain/usecase`          | `domain/usecase`                |
| `Domain/Repositories`     | `domain/repository`       | `domain/repository`             |
| `Domain/Errors`           | `domain/error`            | `domain/error`                  |
| `Data/Repositories`       | `data/repository`         | `data/repository`               |
| `Data/DataSources/Remote` | `data/datasource/remote`  | `data/datasource/remote`        |
| `Data/DataSources/Local`  | `data/datasource/local`   | `data/datasource/local`         |
| `Data/DTOs`               | `data/dto`                | `data/dto`                      |
| `Data/Mappers`            | `data/mapper`             | `data/mapper`                   |
| `Presentation/ViewModels` | `presentation/viewmodel`  | `presentation/controller`       |
| `Presentation/Views`      | `presentation/view`       | `presentation/request`, `presentation/response` |
| `Presentation/Components` | `presentation/component`  | `presentation/handler`          |
| `DI`                      | `di`                      | `di`                            |
| `Tests/.../TestDoubles`   | `src/test/.../testdouble` | `src/test/.../testdouble`       |

## Regra de dependência

```
presentation → domain ← data
        ↖      di      ↗
```

- `domain` não importa nada das outras camadas nem de framework.
- `data` e `presentation` dependem só de `domain`, nunca uma da outra.
- `di` é o único lugar que conhece as implementações concretas e as injeta pelas interfaces.

## Rodar os testes

```sh
./gradlew test
```

Precisa do JDK 21. Os arquivos `.gitkeep` só existem para o git versionar as pastas vazias. Pode apagá-los quando a pasta ganhar o primeiro arquivo.
