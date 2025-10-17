# 2048 Game - Sathvik R G
# sathvikrg28@gmail.com

A modern implementation of the popular 2048 puzzle game built with Vue 3, Vuetify 3, and Pinia for state management. Features a beautiful Material Design interface with smooth animations and responsive design.

## 🎮 Game Features

- **Classic 2048 Gameplay**: Slide tiles to combine numbers and reach 2048
- **Configurable Board Size**: Play on 3x3, 4x4, 5x5, or 6x6 boards
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Touch Controls**: Mobile-friendly touch controls for tile movement
- **Score Tracking**: Track current score, best score, and game statistics
- **Auto-save**: Automatically saves your progress
- **Dark/Light Theme**: Toggle between light and dark themes
- **Smooth Animations**: Beautiful tile animations and transitions
- **Game Statistics**: View detailed game statistics and efficiency metrics

## 🚀 Quick Start

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SathvikRG/2048-game-vue-sathvik-rg
   cd 2048-game-vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎯 How to Play

1. **Objective**: Combine numbered tiles to reach the 2048 tile
2. **Controls**: 
   - Use **Arrow Keys** or **WASD** to move tiles
   - On mobile, use the on-screen directional buttons
3. **Gameplay**:
   - Tiles with the same number merge when they collide
   - After each move, a new tile (2 or 4) appears randomly
   - Game ends when you reach 2048 (win) or no moves are possible (lose)

## 🏗️ Technical Architecture

### Tech Stack
- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component framework
- **Pinia** - State management library
- **Vite** - Fast build tool and dev server

### Project Structure
```
src/
├── components/          # Vue components (modular structure)
│   ├── GameBoard/      # Main game board component
│   │   ├── index.vue   # Component entry point
│   │   ├── template.pug # Pug template
│   │   ├── script.js   # Component logic
│   │   └── style.css   # Component styles
│   ├── GameTile/       # Individual tile component
│   ├── GameHeader/     # Score and title display
│   ├── GameControls/   # Game control buttons
│   ├── GameStatus/     # Game status and statistics
│   ├── SettingsDialog/ # Settings modal
│   └── GameOverDialog/ # Game over modal
├── stores/             # Pinia stores
│   └── gameStore.js    # Game state management
├── utils/              # Utility functions
│   └── gameLogic.js    # Pure game logic functions
└── main.js            # Application entry point
```

### Key Design Principles

1. **Functional Programming**: Game logic uses pure functions with no side effects
2. **Component Architecture**: Modular, reusable Vue components
3. **State Management**: Centralized state with Pinia store
4. **Responsive Design**: Mobile-first approach with Vuetify's grid system
5. **Accessibility**: Keyboard navigation and screen reader support

## 🎨 Customization

### Board Size
The game supports configurable board sizes (3x3 to 6x6). Change the board size in the settings dialog.

### Themes
Switch between light and dark themes using the theme toggle in the app bar.

### Settings
Access game settings by clicking the gear icon in the app bar:
- Board size selection
- Theme preferences
- Animation toggles
- Auto-save options

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch-friendly controls
- Optimized layouts for different screen sizes
- Swipe gesture support (future enhancement)
- Mobile-specific UI adjustments

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style
- Uses Vue 3 Options API
- Follows Vue.js style guide
- ESLint configuration for code quality
- Consistent component structure

## 🚀 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

### Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🎯 Interview Discussion Points

### Functional Programming
- Pure functions in `gameLogic.js`
- Immutable data structures
- No side effects in game logic
- Predictable state updates

### Vue.js Concepts
- Options API vs Composition API
- Component lifecycle hooks
- Props and events
- Computed properties and watchers
- Pinia state management

### Game Development
- Game state management
- Animation and transitions
- User input handling
- Performance optimization

### Design Patterns
- Component composition
- State management patterns
- Event handling
- Responsive design principles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original 2048 game by Gabriele Cirulli
- Vue.js team for the amazing framework
- Vuetify team for the Material Design components
- Material Design Icons for the icon set
