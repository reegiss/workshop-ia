# DemoBank

Módulo de exemplo organizado em Clean Architecture + MVVM. Por enquanto só tem a estrutura de pastas, sem implementação.

## Camadas

```
Sources/DemoBank/
├── Domain/                 regras de negócio, sem dependência de UIKit/SwiftUI ou rede
│   ├── Entities/           modelos do domínio (structs imutáveis)
│   ├── UseCases/           um caso de uso por arquivo, orquestra a regra
│   ├── Repositories/       protocolos dos repositórios (contratos, sem implementação)
│   └── Errors/             erros do domínio
├── Data/                   implementa os contratos do domínio
│   ├── Repositories/       implementações dos protocolos de Domain/Repositories
│   ├── DataSources/
│   │   ├── Remote/         API, cliente HTTP
│   │   └── Local/          cache, persistência
│   ├── DTOs/               modelos de transporte (Codable)
│   └── Mappers/            DTO → Entity
├── Presentation/           MVVM
│   ├── ViewModels/         estado da tela, chama os casos de uso
│   ├── Views/              telas SwiftUI, só leem o ViewModel
│   └── Components/         views reutilizáveis
└── DI/                     composition root: monta as dependências

Tests/DemoBankTests/
├── Domain/UseCases/
├── Data/Repositories/
├── Data/Mappers/
├── Presentation/ViewModels/
└── TestDoubles/            stubs, spies e fakes dos protocolos
```

## Regra de dependência

```
Presentation → Domain ← Data
        ↖      DI      ↗
```

- `Domain` não importa nada das outras camadas.
- `Data` e `Presentation` dependem só de `Domain`, nunca uma da outra.
- `DI` é o único lugar que conhece as implementações concretas e as injeta pelos protocolos.

Os arquivos `.gitkeep` só existem para o git versionar as pastas vazias. Pode apagá-los quando a pasta ganhar o primeiro arquivo.
