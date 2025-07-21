<script setup lang="ts">
import { createEntity } from '@/assets/utils/entity';
import TwoDGame from '@/components/2DGame.vue'
import type { Entity, NPC, Player } from '@packages/types/game';
import { ref } from 'vue';

const player = createEntity({
  id: "1",
  type: 'player',
  position: {
    x: 1000,
    y: 1000
  }
}) as Player

const entities = ref([])
</script>

<template>
  <main>
    <!-- add a "modules" prop which is an array of functions? and each module function gets loaded in and executed? so you can extend a 2dgame with modules, such as a module to outline the user. and if you dont want that feature, just dont add it to the modules array. except, how do i make this actually work? how do you write a function that gets executed to add an outline? where is the function defined? -->
    <TwoDGame :player="player" :entities="entities"/>
  </main>
</template>
