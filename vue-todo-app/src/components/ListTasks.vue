<template>
  <v-list
      flat
      subheader
      three-line
    >
      <v-subheader bold-text>List Todo</v-subheader>

      <v-list-item-group
        multiple
        active-class=""
      >
        <v-list-item v-for="task in tasks" :key="task.id" v-bind:disabled="task.status == 1 ? true : false">
          <template v-slot:default="{ active }" >
            <v-list-item-action>
              <v-checkbox :input-value="task.status == 1 || active ? true : false"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="task.status == 1 ? 'text-decoration-line-through' : ''"><v-icon left small v-if="task.pin != 0" color="#eda489">mdi-pin-outline</v-icon>{{ task.name }}</v-list-item-title>
              <v-list-item-subtitle :class="task.status == 1 ? 'text-decoration-line-through' : ''">{{ task.content }}</v-list-item-subtitle>
            </v-list-item-content>
        
            <v-btn v-if="active"
              tile
              color="#d15555"
              @click.native=removeTask(task.id)
            >
              <v-icon left>
                mdi-delete
              </v-icon>
              Remove
            </v-btn>
            <v-btn v-if="active"
              tile
              color="#a1d76f"
              @click=doneTask(task.id)
              class="ml-1"
            >
              <v-icon left>
                mdi-check
              </v-icon>
              Done
            </v-btn>
            <v-btn v-if="active && task.pin==0"
              tile
              color="#e8fd96"
              @click=pinTask(task.id)
              class="ml-1"
            >
              <v-icon left>
                mdi-pin
              </v-icon>
              Pin
            </v-btn>
            <v-btn v-if="active && task.pin!=0"
              tile
              color="#eda489"
              @click=unpinTask(task.id)
              class="ml-1"
            >
              <v-icon left>
                mdi-pin-off
              </v-icon>
              Unpin
            </v-btn>
          </template>
        </v-list-item>

      </v-list-item-group>
    </v-list>
</template>
<script>
  export default {
    props: ['tasks'],
    data: () => ({
    }),

    methods: {
        doneTask (id) { this.$emit("doneTask", id) },
        removeTask (id) { this.$emit("removeTask", id)},
        pinTask (id) { this.$emit("pinTask", id)},
        unpinTask (id) { this.$emit("unpinTask", id)},
    },
  }
</script>