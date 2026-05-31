# rogue-js-2 — Project Context

## Overview
A browser-based roguelike game built with TypeScript and React, using a custom pixel game engine (`@Qazzian/pixel-game-engine`). Bundled with Webpack, tested with Jest.

## Tech Stack
- **Language**: TypeScript 5.x
- **UI**: React 19 (functional components, hooks)
- **Game engine**: `@Qazzian/pixel-game-engine` (canvas rendering, FOV, grid, random)
- **Bundler**: Webpack 5 + webpack-dev-server
- **Tests**: Jest + ts-jest (+ babel-jest)
- **Linting**: ESLint 9 + typescript-eslint + eslint-plugin-react + Prettier

## Project Structure
```
src/
  index.ts                        # Entry point — mounts React app
  index.html / index.css
  ImageLoader_Arial10x10.js       # Sprite sheet loader
  RogueEngine/
    Game.ts                       # Core game class (EventEmitter)
    Entity.ts                     # Player/NPC entity
    MapTile.ts                    # Single tile (type, movement, sight)
    MapView.ts                    # Viewport/camera over a GameMap
    Room.ts                       # Rectangular room primitive
    GameTheme.ts                  # Tile/entity visual themes
    Game.test.ts
    MapView.test.ts
    Room.test.ts
    tools/
      DebugOptions.tsx             # DebugFlags type
    mapGenerators/
      GameMap.ts                  # Abstract base class for all maps
      MapGeneratorFactory.ts      # Factory + mapGeneratorList registry
      EmptyMap.ts                 # Blank map
      TutorialMap.ts              # Random room + tunnel generator
      AdvancedHeroquestGenerator.ts
      AHQ/                        # AHQ generator helpers
  GameComponents/
    index.tsx                     # Root React component, owns Game instance
    Debug.tsx                     # Debug flag toggles UI
    MapGeneratorSelector.tsx      # Dropdown to pick map generator
images/
  arial10x10.png                  # Bitmap font / sprite sheet
dist/                             # Webpack output
```

## Key Classes & Relationships

### `Game` (RogueEngine/Game.ts)
- Owns `PixelGameEngine` (canvas), `MapView`, `Entity[]`, `GameMap`
- `start()` — generates map, places player, starts game loop
- `update()` — called each frame; clears, prints map, entities, overlays, FOV
- `handleKeyEvent()` — arrow keys move player
- `setMapGenerator(id)` — sets generator for next `start()` call
- Debug flags: `showRoomNumbers`, `showFovGeometry`, `showFov`

### `GameMap` (abstract)
- `generateMap(random: Random): void`
- `getPlayerStart(): Point`
- `getTilesInRange(area: Area): Grid<MapTile>`
- `canMoveTo(x, y)` / `canSeeThrough(x, y)`

### `MapView`
- Viewport centered on player position
- `update(center: Position)` — recalculates visible tile grid
- `print()` — draws tiles via `DrawInterface`
- Exposes `xOffset`, `yOffset`, `window`, `visibleMap`

### `MapTile`
- `tileType: string` (e.g. `"wall"`, `"ground"`, `"empty"`)
- `allowsMovement`, `allowsSight`

### `Entity`
- `x, y, type, theme`
- `move(dx, dy)`

## Map Generators
Registered in `MapGeneratorFactory.ts`:
| id | Class | Description |
|----|-------|-------------|
| `"empty"` | `EmptyMap` | Blank passable map |
| `"tutorial"` | `TutorialMap` | Random non-overlapping rooms joined by tunnels |
| `"AHQ"` | `AdvancedHeroquestGenerator` | Heroquest-style dungeon |

To add a new generator: create a class extending `GameMap`, add it to the `switch` in `MapGeneratorFactory` and to `mapGeneratorList`.

## React UI
`GameComponents/index.tsx` creates a single `Game` instance at module level and wires:
- `keydown` → `game.handleKeyEvent()`
- "New map" button → `game.pause()` + `game.start()`
- Pause/unpause buttons
- `MapGeneratorSelector` → `game.setMapGenerator(id)`
- FPS display via `gameUpdatedHandler`

## Scripts
```
npm run build        # webpack production build
npm run start        # webpack-dev-server (hot reload)
npm run test         # jest
npm run test:watch   # jest --watch
npm run lint         # eslint ./src
```

## Config Files
- `tsconfig.json` — TypeScript config
- `webpack.config.js` — Webpack config
- `jest.config.js` — Jest config (ts-jest)
- `babel.config.js` — Babel config (for jest)
- `eslint.config.mjs` — ESLint flat config
- `.prettierrc.json` — Prettier config
