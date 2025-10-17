import { mapState } from 'pinia'
import { useGameStore } from '../../stores/gameStore'

export default {
  name: 'GameHeader',
  computed: {
    ...mapState(useGameStore, ['score', 'bestScore'])
  }
}
