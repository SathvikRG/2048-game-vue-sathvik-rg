<template>
  <div
    class="game-tile"
    :class="[
      `tile-${tile.value}`,
      { 'tile-new': isNew, 'tile-merged': isMerged }
    ]"
    :style="tileStyle"
  >
    <span class="tile-value">{{ tile.value }}</span>
  </div>
</template>

<script>
export default {
  name: 'GameTile',
  props: {
    tile: {
      type: Object,
      required: true
    },
    boardSize: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      isNew: true,
      isMerged: false
    }
  },
  computed: {
    tileStyle() {
      return {
        gridColumn: `${this.tile.x + 1}`,
        gridRow: `${this.tile.y + 1}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        zIndex: 1,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        fontSize: '1.5rem',
        minHeight: '60px'
      }
    }
  },
  mounted() {
    // Remove new animation after mount
    setTimeout(() => {
      this.isNew = false
    }, 200)
  }
}
</script>

<style scoped>
.game-tile {
  background-color: #eee4da;
  color: #776e65;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Tile value specific colors */
.tile-2 { background-color: #eee4da; color: #776e65; }
.tile-4 { background-color: #ede0c8; color: #776e65; }
.tile-8 { background-color: #f2b179; color: #f9f6f2; }
.tile-16 { background-color: #f59563; color: #f9f6f2; }
.tile-32 { background-color: #f67c5f; color: #f9f6f2; }
.tile-64 { background-color: #f65e3b; color: #f9f6f2; }
.tile-128 { background-color: #edcf72; color: #f9f6f2; font-size: 0.85em; }
.tile-256 { background-color: #edcc61; color: #f9f6f2; font-size: 0.85em; }
.tile-512 { background-color: #edc850; color: #f9f6f2; font-size: 0.85em; }
.tile-1024 { background-color: #edc53f; color: #f9f6f2; font-size: 0.75em; }
.tile-2048 { background-color: #edc22e; color: #f9f6f2; font-size: 0.75em; }

/* Higher values */
.tile-4096, .tile-8192, .tile-16384, .tile-32768, .tile-65536 {
  background-color: #3c3a32;
  color: #f9f6f2;
  font-size: 0.6em;
}

/* Animations */
.tile-new {
  animation: tileAppear 0.2s ease-in-out;
}

.tile-merged {
  animation: tileMerge 0.15s ease-in-out;
}

@keyframes tileAppear {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes tileMerge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
