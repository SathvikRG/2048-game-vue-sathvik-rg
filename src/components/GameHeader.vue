<template>
  <v-card elevation="3">
    <v-card-text class="pa-6">
      <v-row align="center" no-gutters>
        <!-- Title and Description -->
        <v-col cols="12" md="6">
          <h1 class="text-h3 font-weight-bold text-primary mb-3">
            2048
          </h1>
          <p class="text-body-1 text-medium-emphasis mb-0">
            Join the numbers and get to the <strong>2048</strong> tile!
          </p>
        </v-col>
        
        <!-- Score Cards -->
        <v-col cols="12" md="6" class="mt-4 mt-md-0">
          <v-row no-gutters>
            <v-col cols="6" class="pr-3">
              <v-card
                color="grey-lighten-4"
                class="text-center pa-4 score-card"
                elevation="2"
              >
                <div class="text-caption text-uppercase font-weight-bold text-grey-darken-1 mb-2">
                  Score
                </div>
                <div class="text-h4 font-weight-bold text-primary">
                  {{ (score || 0).toLocaleString() }}
                </div>
              </v-card>
            </v-col>
            
            <v-col cols="6" class="pl-3">
              <v-card
                color="grey-lighten-4"
                class="text-center pa-4 score-card"
                elevation="2"
              >
                <div class="text-caption text-uppercase font-weight-bold text-grey-darken-1 mb-2">
                  Best
                </div>
                <div class="text-h4 font-weight-bold text-primary">
                  {{ (bestScore || 0).toLocaleString() }}
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { useGameStore } from '../stores/gameStore'

export default {
  name: 'GameHeader',
  setup() {
    const gameStore = useGameStore()
    return {
      gameStore
    }
  },
  computed: {
    score() {
      return this.gameStore.score
    },
    bestScore() {
      return this.gameStore.bestScore
    }
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
}

.score-card {
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.score-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
