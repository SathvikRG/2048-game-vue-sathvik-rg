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
