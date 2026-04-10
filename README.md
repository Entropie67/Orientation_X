# Horizon Orientation

## Démarrage rapide

```bash
npm install
npm run dev
```

⚠️ Important: ne pas ouvrir `index.html` directement dans le navigateur (fichier local `file://`).
Le style Tailwind est compilé par Vite/PostCSS : il faut lancer le serveur dev ou faire un build.

## Build production

```bash
npm run build
npm run preview
```

## Préprompt (préparation OpenRouter)

La v1 locale prépare un mécanisme de **directive complémentaire** (préprompt côté serveur) :
- `src/prompts/recommendationPrompt.ts` : prompt principal orientation (inclut logique NSI)
- `src/services/llm/serverPreprompt.ts` : zone pour injecter des directives additionnelles
- `src/services/llm/openrouter.ts` : composition `prompt principal + directive complémentaire + données structurées élève`

Ainsi, plus tard côté backend, tu pourras injecter des consignes établissement/administration sans réécrire le prompt principal.
