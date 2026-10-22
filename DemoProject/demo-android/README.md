# DemoBank (Android)

Módulo de exemplo organizado em Clean Architecture + MVVM, espelhando o `Demo-ios`. Por enquanto só tem a estrutura de pastas, sem implementação.

## Camadas

```
demobank/src/main/kotlin/com/demo/bank/
├── domain/                 regras de negócio, sem dependência de Android ou rede
│   ├── entity/             modelos do domínio (data classes imutáveis)
│   ├── usecase/            um caso de uso por arquivo, orquestra a regra
│   ├── repository/         interfaces dos repositórios (contratos, sem implementação)
│   └── error/              erros do domínio
├── data/                   implementa os contratos do domínio
│   ├── repository/         implementações das interfaces de domain/repository
│   ├── datasource/
│   │   ├── remote/         API, cliente HTTP
│   │   └── local/          cache, persistência
│   ├── dto/                modelos de transporte
│   └── mapper/             DTO → Entity
├── presentation/           MVVM
│   ├── viewmodel/          estado da tela, chama os casos de uso
│   ├── view/               telas, só observam o ViewModel
│   └── component/          views reutilizáveis
└── di/                     composition root: monta as dependências

demobank/src/test/kotlin/com/demo/bank/
├── domain/usecase/
├── data/repository/
├── data/mapper/
├── presentation/viewmodel/
└── testdouble/             stubs, spies e fakes das interfaces
```

| iOS (`Demo-ios`)          | Android (`demo-android`)  |
|---------------------------|---------------------------|
| `Domain/Entities`         | `domain/entity`           |
| `Domain/UseCases`         | `domain/usecase`          |
| `Domain/Repositories`     | `domain/repository`       |
| `Domain/Errors`           | `domain/error`            |
| `Data/Repositories`       | `data/repository`         |
| `Data/DataSources/Remote` | `data/datasource/remote`  |
| `Data/DataSources/Local`  | `data/datasource/local`   |
| `Data/DTOs`               | `data/dto`                |
| `Data/Mappers`            | `data/mapper`             |
| `Presentation/ViewModels` | `presentation/viewmodel`  |
| `Presentation/Views`      | `presentation/view`       |
| `Presentation/Components` | `presentation/component`  |
| `DI`                      | `di`                      |
| `Tests/.../TestDoubles`   | `src/test/.../testdouble` |

Os pacotes seguem a convenção do Kotlin (minúsculas, singular). As pastas são as mesmas do iOS.

## Regra de dependência

```
presentation → domain ← data
        ↖      di      ↗
```

- `domain` não importa nada das outras camadas nem do Android.
- `data` e `presentation` dependem só de `domain`, nunca uma da outra.
- `di` é o único lugar que conhece as implementações concretas e as injeta pelas interfaces.

## Rodar os testes

```sh
./gradlew :demobank:testDebugUnitTest
```

O SDK é encontrado pela variável `ANDROID_HOME` ou pelo `local.properties`, que o Android Studio cria ao abrir o projeto e que não vai para o git.

Os arquivos `.gitkeep` só existem para o git versionar as pastas vazias. Pode apagá-los quando a pasta ganhar o primeiro arquivo.
